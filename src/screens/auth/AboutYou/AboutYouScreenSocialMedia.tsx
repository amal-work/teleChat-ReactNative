import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { AuthHeader, PinScreen } from 'components/features';
import {
	ActionSheet,
	DateInput,
	Icon,
	Input,
	KeyboardDismissal,
	PrimaryButton,
	Slider,
	PhoneInput
} from 'components/ui';
import { ReturnKey, StorageKey } from 'consts';
import { focusInput, focusTouchableOpacity } from 'helpers';
import {
	useAuthContext,
	useRegisterSocialMediaMutation,
	useNotification
} from 'hooks';
import { Routes } from 'types';

import AsyncStorage from '@react-native-async-storage/async-storage';
import screenStyles from '../../screens.style';
import commonStyles from '../auth.styles';
import styles from './AboutYouScreen.style';
import {
	AboutYouSocialMediaScreenNavigationProp,
	AboutYouSocialMediaScreenRouteProp
} from './AboutYouSocialMediaScreen.types';

interface Props {
	navigation: AboutYouSocialMediaScreenNavigationProp;
	route: AboutYouSocialMediaScreenRouteProp;
}

const PHONE_REG_EXP = /^((\\+[+]?[1-9]{1,4}[ \\-]*)|(\\([+]?[0-9]{2,3}\\)[ \\-]*)|([+]?[0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export function AboutYouSocialMediaScreen({
	navigation: { navigate, goBack },
	route
}: Props) {
	const params = route.params;

	const [firstName, setFirstName] = useState(params?.data?.firstName);
	const [lastName, setLastName] = useState(params?.data?.lastName);
	const [selectDate, setSelectedDate] = useState(params?.data?.birthday || '');
	const [pinConfirmation, setPinConfirmation] = useState(false);

	const [registerSocialMedia] = useRegisterSocialMediaMutation();

	const [modalVisible, setModalVisibility] = useState(false);

	const NEW_PIN_VALIDATION_SCHEMA = yup.object().shape({
		phone: yup
			.string()
			.matches(PHONE_REG_EXP, 'Phone number is not valid!')
			.required('Please enter a valid phone number!'),
		pin: yup.string(),
		confirmPin: yup.string().oneOf([yup.ref('pin')], 'Pin do not match')
	});

	const {
		values,
		errors,
		handleChange,
		handleSubmit,
		resetForm,
		touched,
		setFieldTouched,
		isValid
	} = useFormik({
		initialValues: {
			phone: params?.data?.phoneNumber || '',
			pin: '',
			confirmPin: ''
		},
		validationSchema: NEW_PIN_VALIDATION_SCHEMA,
		onSubmit: async ({ phone, pin }) => {
			//
		}
	});

	const submitRegistration = useCallback(
		async (cb: () => void) => {
			const { phone, pin } = values;
			try {
				const { birthday, phoneNumber, ...validData } = params?.data;
				const registerRes = await registerSocialMedia({
					variables: {
						...validData,
						type: params?.type.toString(),
						dateOfBirth: new Date(selectDate).toISOString(),
						phone,
						pin,
						firstName,
						lastName
					}
				});
				if (registerRes.data?.registerSocialMedia) {
					await AsyncStorage.setItem(StorageKey.Key, params?.type.toString());
					cb();
					navigate(Routes.PhoneVerification, {
						phone,
						socialMedia: params?.type.toString()
					});
					console.log(params);
				} else {
					console.log(registerRes);
					cb();
				}
			} catch (e) {
				cb();
				console.log(e);
			}
		},
		[
			values,
			params,
			registerSocialMedia,
			selectDate,
			firstName,
			lastName,
			navigate
		]
	);

	useEffect(() => {
		if (values.pin.length === 4) {
			setPinConfirmation(true);
		}
		if (values.confirmPin.length === 4 && isValid) {
			submitRegistration(() => {
				setModalVisibility(false);
				setPinConfirmation(false);
				resetForm();
			});
		}
	}, [values.pin, values.confirmPin, isValid, submitRegistration, resetForm]);

	const lastNameRef = useRef<TextInput>(null);
	const phoneRef = useRef<TextInput>(null);
	// const expRef = useRef<DateInputRef>(null);

	return (
		<View style={screenStyles.default}>
			<AuthHeader title='Coins App' onButtonPress={() => goBack()} />
			<ScrollView
				contentContainerStyle={{ paddingBottom: 100 }}
				keyboardShouldPersistTaps={!!phoneRef ? 'always' : 'handled'}>
				<KeyboardDismissal scrollEnabled={false}>
					<View style={styles.titleContainer}>
						<Text style={commonStyles.title}>Let’s know more about you</Text>
						<Text style={commonStyles.subtitle}>
							We would need some personal information to verify your identity
							later
						</Text>
						{!!params?.data?.profilePicture && (
							<Icon
								src={params?.data?.profilePicture}
								size={60}
								style={{ marginTop: 30 }}
							/>
						)}
					</View>
					<View style={styles.inputContainer}>
						<View style={{ flex: 1 }}>
							<Input
								label='First Name'
								disabled={!!params?.data?.firstName}
								value={firstName}
								returnKeyType={ReturnKey.Next}
								onChangeText={(e) => setFirstName(e)}
								onSubmit={() => focusInput(lastNameRef)}
							/>
						</View>
						<View style={{ width: 15 }} />
						<View style={{ flex: 1 }}>
							<Input
								ref={lastNameRef}
								label='Last Name'
								disabled={!!params?.data?.lastName}
								value={lastName}
								returnKeyType={ReturnKey.Next}
								onChangeText={(e) => setLastName(e)}
								onSubmit={() => focusInput(phoneRef)}
							/>
						</View>
					</View>
					<View style={{ marginBottom: 20 }}>
						<PhoneInput
							ref={phoneRef}
							label='Phone number'
							disabled={!!params?.data?.phoneNumber}
							value={values.phone}
							error={touched.phone ? errors.phone : undefined}
							onFocus={() => setFieldTouched('phone')}
							returnKeyType={
								!params?.data.birthday ? ReturnKey.Next : ReturnKey.Done
							}
							onChangeText={handleChange('phone')}
							// onSubmit={() =>
							// 	!params.data.birthday && expRef.current?.onPress()
							// }
						/>
					</View>
					<View style={styles.dateContainer}>
						{/* !TODO: on disable don't focus the input */}
						<DateInput
							// ref={expRef}
							label='Date of birth'
							date={selectDate}
							disabled={!!params?.data.birthday}
							setDate={setSelectedDate}
						/>
						<Text style={styles.infoBirthDate}>
							Your date of birth must match your ID and cannot be changed later
						</Text>
					</View>
					<PrimaryButton
						title='Complete registration'
						onPress={() => setModalVisibility(true)}
						loading={false}
						disabled={
							(!touched.phone && !errors.phone) || selectDate.length === 0
						}
					/>
				</KeyboardDismissal>
			</ScrollView>
			<ActionSheet
				visible={modalVisible}
				pin
				onClose={() => setModalVisibility(false)}>
				<Slider>
					<Slider.Slide active={!pinConfirmation}>
						<View style={{ flex: 1 }}>
							<PinScreen
								modal={true}
								operationTitle='Enter a PIN'
								containerStyles={{ flex: 1 }}
								pin={values.pin}
								setPin={handleChange('pin')}
								onBackPress={() => setModalVisibility(false)}
							/>
						</View>
					</Slider.Slide>
					<Slider.Slide active={pinConfirmation}>
						<View style={{ flex: 1 }}>
							<PinScreen
								modal={true}
								operationTitle='Re-enter PIN'
								error={errors.confirmPin}
								containerStyles={{ flex: 1 }}
								pin={values.confirmPin}
								setPin={handleChange('confirmPin')}
								onBackPress={() => setPinConfirmation(false)}
							/>
						</View>
					</Slider.Slide>
				</Slider>
			</ActionSheet>
		</View>
	);
}
