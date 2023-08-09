import React, { useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { AuthHeader } from 'components/features';
import { Icon, PrimaryButton, Input, KeyboardDismissal } from 'components/ui';

import { Routes } from 'types';
import { ForgotPasswordScreenNavigationProp } from './ForgotPasswordScreen.types';

import styles from './ForgotPasswordScreen.styles';
import commonStyles from '../auth.styles';
import screenStyles from '../../screens.style';

const FORGOT_PASSWORD_VALIDATION_SCHEMA = yup.object().shape({
	phone: yup.string().required('Please enter a valid phone')
});

interface Props {
	navigation: ForgotPasswordScreenNavigationProp;
}

export function ForgotPasswordScreen({ navigation }: Props) {
	const scrollRef = useRef<ScrollView>(null);

	const { values, errors, handleChange, handleSubmit, isValid } = useFormik({
		initialValues: { phone: '' },
		validationSchema: FORGOT_PASSWORD_VALIDATION_SCHEMA,
		onSubmit: ({ phone }) => {
			console.log('send reset code to ', phone);
			navigation.reset({ routes: [{ name: Routes.Authentication }] });
		}
	});

	const footerButtonHandler = () => {
		navigation.goBack();
	};

	const handleFocus = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollTo({ y: 200 });
		}
	};

	return (
		<KeyboardDismissal
			scrollRef={scrollRef}
			contentContainerStyle={[screenStyles.list, styles.keyboardWrapper]}>
			<AuthHeader title='Coins App' />
			<View style={screenStyles.default}>
				<View style={styles.titleContainer}>
					<Text style={commonStyles.title}>Forgot password?</Text>
					<Text style={commonStyles.subtitle}>
						Enter your Phone number and a reset code will be sent to your inbox
					</Text>
				</View>

				<View style={styles.iconContainer}>
					<Icon type={({ Envelope }) => Envelope} size={120} />
				</View>

				<Input
					value={values.phone}
					error={errors.phone}
					onChangeText={handleChange('phone')}
					label='Phone'
					onFocus={handleFocus}
				/>

				<PrimaryButton
					title='Get Reset Code'
					disabled={!isValid}
					onPress={handleSubmit}
					containerStyle={styles.buttonWrapper}
				/>
				<View style={styles.row}>
					<Text style={styles.subtitle}>Don’t have an account? </Text>
					<TouchableOpacity onPress={footerButtonHandler}>
						<Text style={commonStyles.text}>Sign up</Text>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardDismissal>
	);
}
