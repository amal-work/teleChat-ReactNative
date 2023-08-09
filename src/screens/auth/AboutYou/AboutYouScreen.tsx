import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Text, TextInput, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { AuthHeader, PinScreen } from 'components/features';
import {
	ActionSheet,
	DateInput,
	Input,
	KeyboardDismissal,
	PrimaryButton,
	Slider
} from 'components/ui';
import { ReturnKey, StorageKey } from 'consts';
import { focusInput } from 'helpers';
import {
	useAuthContext,
	useCompleteRegistration,
	useNotification,
	useRegisterNotification
} from 'hooks';

import screenStyles from '../../screens.style';
import commonStyles from '../auth.styles';
import styles from './AboutYouScreen.style';
import { AboutYouScreenNavigationProp } from './AboutYouScreen.types';
// import { DateInputRef } from 'types';

interface Props {
	navigation: AboutYouScreenNavigationProp;
}

export function AboutYouScreen({ navigation: { goBack } }: Props) {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [selectDate, setSelectedDate] = useState('');
	const [pinConfirmation, setPinConfirmation] = useState(false);

	const [modalVisible, setModalVisibility] = useState(false);

	const { login: localLogin } = useAuthContext();
	// const { registerDevice } = useNotification();

	const [
		completeRegistration,
		{ loading: completingRegistration }
	] = useCompleteRegistration();

	const NEW_PIN_VALIDATION_SCHEMA = yup.object().shape({
		pin: yup.string(),
		confirmPin: yup.string().oneOf([yup.ref('pin')], 'Pin do not match')
	});

	const {
		values,
		errors,
		handleChange,
		handleSubmit,
		resetForm,
		isValid
	} = useFormik({
		initialValues: { pin: '', confirmPin: '' },
		validationSchema: NEW_PIN_VALIDATION_SCHEMA,
		onSubmit: async ({ pin }) => {
			//
		}
	});

	const submitRegistration = useCallback(
		async (cb: () => void) => {
			try {
				const { pin } = values;
				console.log('pin:', pin);
				const res = await completeRegistration({
					variables: {
						firstName,
						lastName,
						dateOfBirth: new Date(selectDate).toISOString(),
						pinCode: pin
					}
				});
				console.log(res);
				if (
					res.data &&
					res.data.completeRegistration &&
					res.data.completeRegistration.token
				) {
					await AsyncStorage.setItem(
						StorageKey.Token,
						res.data.completeRegistration.token
					);
					// await registerDevice();
					analytics().logSignUp({ method: 'Email' });
					cb();
					localLogin(true);
				}
			} catch (e) {
				console.log(e);
				cb();
			}
		},
		[
			values,
			completeRegistration,
			firstName,
			lastName,
			selectDate,
			// registerDevice,
			localLogin
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
	const expRef = useRef(null);

	return (
		<>
			<KeyboardDismissal
				scrollEnabled={false}
				contentContainerStyle={screenStyles.list}>
				<AuthHeader title='Coins App' onButtonPress={() => goBack()} />
				<View style={styles.titleContainer}>
					<Text style={commonStyles.title}>Let’s know more about you</Text>
					<Text style={commonStyles.subtitle}>
						We would need some personal information to verify your identity
						later
					</Text>
				</View>
				<View style={styles.inputContainer}>
					<View style={{ flex: 1 }}>
						<Input
							label='First Name'
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
							value={lastName}
							returnKeyType={ReturnKey.Next}
							onChangeText={(e) => setLastName(e)}
							// onSubmit={() => expRef.current?.onPress()}
						/>
					</View>
				</View>
				<View style={styles.dateContainer}>
					<DateInput
						ref={expRef}
						label='Date of birth'
						date={selectDate}
						setDate={setSelectedDate}
					/>
					<Text style={styles.infoBirthDate}>
						Your date of birth must match your ID and cannot be changed later
					</Text>
				</View>
				<PrimaryButton
					title='Complete registration'
					disabled={!firstName || !lastName || !selectDate}
					onPress={() => setModalVisibility(true)}
					loading={completingRegistration}
				/>
			</KeyboardDismissal>
			<ActionSheet
				visible={modalVisible}
				pin={true}
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
								onBackPress={() => handleSubmit()}
							/>
						</View>
					</Slider.Slide>
				</Slider>
			</ActionSheet>
		</>
	);
}
