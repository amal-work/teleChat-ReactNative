import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from 'formik';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSpring } from 'react-spring';
import * as yup from 'yup';
import analytics from '@react-native-firebase/analytics';

import { AuthFooter, AuthHeader, Login, SignUp } from 'components/features';
import {
	KeyboardDismissal,
	GoogleButton,
	FacebookButton,
	AppleButton
} from 'components/ui';
import { StorageKey } from 'consts';
import { resetScroll } from 'helpers';
import {
	useDimensions,
	useLoginMutation,
	useSignUpMutation,
	useAuthContext
} from 'hooks';
import { Routes } from 'types';

import screenStyles from '../../screens.style';
import commonStyles from '../auth.styles';
import { AuthenticationScreenNavigationProp } from './AuthenticationScreen.types';
import styles from './AuthenticationScreen.style';

const PHONE_REG_EXP = /^((\\+[+]?[1-9]{1,4}[ \\-]*)|(\\([+]?[0-9]{2,3}\\)[ \\-]*)|([+]?[0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const PASSWORD_REG_EXP = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const SIGNUP_VALIDATION_SCHEMA = yup.object().shape({
	email: yup
		.string()
		.email('Email is not valid')
		.required('Please enter a valid email'),
	phone: yup
		.string()
		.matches(PHONE_REG_EXP, 'Phone number is not valid!')
		.required('Please enter a valid phone number!'),
	password: yup
		.string()
		.matches(
			PASSWORD_REG_EXP,
			'Password must contain atleast 1 capital letter, a number, a symbol and must be atleast 8 characters in length.'
		)
		.required('The password is incorrect'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('Password confirm is required')
});
const LOGIN_VALIDATION_SCHEMA = yup.object().shape({
	email: yup
		.string()
		.email('Email is not valid')
		.required('Please enter a valid email'),
	password: yup.string().required('The password is incorrect')
});

interface Props {
	navigation: AuthenticationScreenNavigationProp;
}

export function AuthenticationScreen({ navigation }: Props) {
	const { isSmallDevice } = useDimensions();
	const [signUp, setSignUp] = useState(false);
	const [register, { loading: signingUp }] = useSignUpMutation();
	const [
		login,
		{ data: loginData, loading: loginLoading }
	] = useLoginMutation();
	// const { showNotification, registerDevice } = useNotification();
	const { navigate } = navigation;
	const { login: localLogin } = useAuthContext();
	// const { showError, showWarning } = useAlert();

	useEffect(() => {
		function completeLogin(token: string, callback: () => void) {
			AsyncStorage.setItem(StorageKey.Token, token, callback);
		}

		if (loginData?.login.token) {
			completeLogin(loginData.login.token, () => localLogin(true));
		}
	}, [localLogin, loginData]);

	const scrollRef = useRef<ScrollView>(null);

	const loginFormik = useFormik({
		initialValues: { email: '', password: '' },
		validationSchema: LOGIN_VALIDATION_SCHEMA,
		onSubmit: async ({ email, password }) => {
			try {
				await AsyncStorage.multiRemove([StorageKey.Key, StorageKey.Token]);
				const rest = await login({ variables: { email, password } });
				// await registerDevice();
				analytics().logLogin({ method: 'Email' });
				console.log('login', rest);
			} catch (e) {
				//alert error
			}
		}
	});

	const signUpFormik = useFormik({
		initialValues: { email: '', phone: '', password: '', confirmPassword: '' },
		validationSchema: SIGNUP_VALIDATION_SCHEMA,
		onSubmit: async ({ email, phone, password }) => {
			try {
				const res = await register({ variables: { email, phone, password } });
				navigate(Routes.PhoneVerification, { phone });
			} catch (e) {
				//alert error
			}
		}
	});

	const animationLogin = useSpring({
		opacity: !signUp ? 1 : 0,
		zIndex: !signUp ? 1 : 0,
		config: { duration: 200 }
	});

	const animationSignUp = useSpring({
		opacity: signUp ? 1 : 0,
		zIndex: signUp ? 1 : 0,
		config: { duration: 200 }
	});

	const buttonStyle = useSpring({
		top: signUp ? 340 : 210,
		paddingTop: 20,
		config: { duration: 200 }
	});

	function changeSection() {
		if (signUp) {
			signUpFormik.resetForm();
		} else {
			loginFormik.resetForm();
		}

		setSignUp((state) => !state);
	}

	function forgotPasswordHandler() {
		navigate(Routes.ForgotPassword);
	}

	const handleAuthentication = () => {
		navigate(Routes.PhoneVerification);
		// if (signUp) {
		// 	signUpFormik.handleSubmit();
		// } else {
		// 	loginFormik.handleSubmit();
		// }
	};

	return (
		<KeyboardDismissal
			scrollRef={scrollRef}
			contentContainerStyle={[
				screenStyles.list,
				{ paddingBottom: isSmallDevice ? 570 : 620 }
			]}>
			<AuthHeader title='Coins App' />
			<View style={styles.subtitleContainer}>
				<Text style={commonStyles.subtitle}>
					Start using Coins App and enjoy true financial freedom
				</Text>
			</View>
			<View style={styles.socialButtonsContainer}>
				<View style={{ flex: 1, marginRight: 15 }}>
					<GoogleButton navigation={navigation} />
				</View>
				<View style={{ flex: 1 }}>
					<FacebookButton navigation={navigation} />
				</View>
			</View>
			<View style={styles.socialButtonsContainer}>
				<AppleButton navigation={navigation} />
			</View>
			<View style={styles.inputContainers}>
				<Login
					containerStyle={[styles.section, animationLogin]}
					formik={loginFormik}
					scrollRef={scrollRef}
					onSubmit={() => resetScroll(scrollRef)}
					// onForgotPassword={forgotPasswordHandler}
					onForgotPassword={() =>
						//alert error
						{}
					}
				/>
				<SignUp
					containerStyle={[styles.section, animationSignUp]}
					formik={signUpFormik}
					scrollRef={scrollRef}
					onSubmit={() => resetScroll(scrollRef)}
				/>
				<AuthFooter
					question={
						signUp ? 'Already have an account?' : 'Don’t have an account?'
					}
					answer={signUp ? 'Log in' : 'Sign up'}
					disabled={signUp ? !signUpFormik.isValid : !loginFormik.isValid}
					loading={signUp ? signingUp : loginLoading}
					containerStyle={buttonStyle}
					onPrimaryPress={handleAuthentication}
					onAnswerPress={changeSection}
				/>
			</View>
		</KeyboardDismissal>
	);
}
