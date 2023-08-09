import { FormikProps } from 'formik';
import React, { useRef } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
	TextInput,
	ScrollView
} from 'react-native';

import { Input, Spring } from 'components/ui';
import { ReturnKey } from 'consts';
import { focusInput } from 'helpers';
import { useDimensions } from 'hooks';

import styles from 'screens/auth/auth.styles';

interface LoginFormValues {
	email: string;
	password: string;
}

interface Props {
	containerStyle?: StyleProp<ViewStyle>;
	formik: FormikProps<LoginFormValues>;
	scrollRef: React.RefObject<ScrollView>;
	onSubmit?: () => void;
	onForgotPassword: () => void;
}

export function Login({
	containerStyle,
	formik,
	scrollRef,
	onSubmit,
	onForgotPassword
}: Props) {
	const { values, errors, touched, handleChange, setFieldTouched } = formik;

	const { isSmallDevice } = useDimensions();
	const passwordRef = useRef<TextInput>(null);

	function onPasswordFocus() {
		setFieldTouched('password');

		if (isSmallDevice) {
			scrollRef.current?.scrollTo({ y: 210 });
		}
	}

	return (
		<Spring.View style={containerStyle}>
			<View style={styles.inputContainer}>
				<View style={styles.bar} />
				<View style={{ marginHorizontal: 12 }}>
					<Text style={styles.subtitle}>Or Log in with</Text>
				</View>
				<View style={styles.bar} />
			</View>
			<Input
				label='Email'
				value={values.email}
				error={touched.email ? errors.email : undefined}
				containerStyle={{ marginBottom: 60 }}
				returnKeyType={ReturnKey.Next}
				onFocus={() => setFieldTouched('email')}
				onChangeText={handleChange('email')}
				onSubmit={() => focusInput(passwordRef)}
			/>
			<Input
				ref={passwordRef}
				label='Password'
				password
				value={values.password}
				error={touched.password ? errors.password : undefined}
				containerStyle={{ marginBottom: 16 }}
				returnKeyType={ReturnKey.Done}
				onFocus={onPasswordFocus}
				onChangeText={handleChange('password')}
				onSubmit={onSubmit}
			/>
			<TouchableOpacity
				style={{ alignItems: 'flex-end' }}
				onPress={onForgotPassword}>
				<Text style={styles.text}>Forgot password?</Text>
			</TouchableOpacity>
		</Spring.View>
	);
}
