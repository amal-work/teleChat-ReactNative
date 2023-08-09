import { FormikProps } from 'formik';
import React, { useRef, useState } from 'react';
import {
	View,
	Text,
	StyleProp,
	ViewStyle,
	TextInput,
	ScrollView,
	Keyboard
} from 'react-native';

import { Input, Icon, Spring, PhoneInput } from 'components/ui';
import { ReturnKey } from 'consts';
import { Colors } from 'environment';
import { focusInput } from 'helpers';
import { useDimensions } from 'hooks';

import styles from 'screens/auth/auth.styles';

interface SignUpFormValues {
	email: string;
	phone: string;
	password: string;
	confirmPassword: string;
}

interface Props {
	containerStyle?: StyleProp<ViewStyle>;
	formik: FormikProps<SignUpFormValues>;
	scrollRef: React.RefObject<ScrollView>;
	onSubmit?: () => void;
}

export function SignUp({ containerStyle, formik, scrollRef, onSubmit }: Props) {
	const [securePassword, setSecure] = useState(true);
	const { values, errors, touched, handleChange, setFieldTouched } = formik;

	const { isSmallDevice } = useDimensions();
	const phoneNumberRef = useRef<TextInput>(null);
	const passwordRef = useRef<TextInput>(null);
	const confirmPasswordRef = useRef<TextInput>(null);

	function onPhoneFocus() {
		setFieldTouched('phone');

		if (isSmallDevice) {
			scrollRef.current?.scrollTo({ y: 90 });
		}
	}

	function onPasswordFocus() {
		setFieldTouched('password');

		scrollRef.current?.scrollTo({ y: 180 });
	}

	function onConfirmPasswordFocus() {
		setFieldTouched('confirmPassword');

		scrollRef.current?.scrollTo({ y: 340 });
	}

	return (
		<Spring.View style={containerStyle}>
			<View style={styles.inputContainer}>
				<View style={styles.bar} />
				<View style={{ marginHorizontal: 12 }}>
					<Text style={styles.subtitle}>Or Sign up with</Text>
				</View>
				<View style={styles.bar} />
			</View>
			<Input
				label='Email'
				value={values.email}
				error={touched.email ? errors.email : undefined}
				containerStyle={{ marginBottom: 60 }}
				returnKeyType={ReturnKey.Next}
				onChangeText={handleChange('email')}
				onFocus={() => setFieldTouched('email')}
				onSubmit={() => focusInput(phoneNumberRef)}
			/>
			<PhoneInput
				ref={phoneNumberRef}
				label='Phone number'
				value={values.phone}
				error={touched.phone ? errors.phone : undefined}
				containerStyle={{ marginBottom: 60 }}
				returnKeyType={ReturnKey.Next}
				onChangeText={handleChange('phone')}
				onFocus={onPhoneFocus}
				onSubmit={() => focusInput(passwordRef)}
			/>
			<Input
				ref={passwordRef}
				containerStyle={{ marginBottom: 60 }}
				label='Password'
				password={securePassword}
				value={values.password}
				error={touched.password ? errors.password : undefined}
				returnKeyType={ReturnKey.Next}
				onChangeText={handleChange('password')}
				onFocus={onPasswordFocus}
				// iconComponent={
				// 	<Icon
				// 		type={({ Visibility, VisibilityOff }) =>
				// 			securePassword ? Visibility : VisibilityOff
				// 		}
				// 		color={Colors.green[10]}
				// 		size={24}
				// 	/>
				// }
				onIconPress={() => setSecure((s) => !s)}
				// blurOnSubmit={false}
				onSubmit={() => {
					Keyboard.dismiss();
					focusInput(confirmPasswordRef);
				}}
			/>
			<Input
				ref={confirmPasswordRef}
				containerStyle={{ marginBottom: 16 }}
				label='Confirm Password'
				password
				value={values.confirmPassword}
				error={touched.confirmPassword ? errors.confirmPassword : undefined}
				returnKeyType={ReturnKey.Done}
				onChangeText={handleChange('confirmPassword')}
				onFocus={onConfirmPasswordFocus}
				// blurOnSubmit={false}
				onSubmit={() => {
					Keyboard.dismiss();
					onSubmit && onSubmit();
				}}
			/>
		</Spring.View>
	);
}
