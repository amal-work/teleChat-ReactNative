import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import * as yup from 'yup';

import { Slider, Screen, Header } from 'components/ui';
import { PinScreen } from 'components/features';

export function ChangePinScreen() {
	const [pinConfirmation, setPinConfirmation] = useState(false);

	const { goBack } = useNavigation();

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
			console.log('pin', pin);
		}
	});

	function handleBack() {
		goBack();
	}

	useEffect(() => {
		if (values.pin.length == 4) {
			setPinConfirmation(true);
		}
		if (values.confirmPin.length == 4 && isValid) {
			handleSubmit();
			setPinConfirmation(false);
			resetForm();
		}
	}, [values.pin, values.confirmPin, isValid, handleSubmit, resetForm]);

	return (
		<Screen headerComponent={<Header title='Change Pin' />}>
			<Slider>
				<Slider.Slide active={!pinConfirmation}>
					<View style={{ flex: 1 }}>
						<PinScreen
							operationTitle='Enter a PIN'
							containerStyles={{ flex: 1 }}
							pin={values.pin}
							setPin={handleChange('pin')}
							onBackPress={() => goBack()}
						/>
					</View>
				</Slider.Slide>
				<Slider.Slide active={pinConfirmation}>
					<View style={{ flex: 1 }}>
						<PinScreen
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
		</Screen>
	);
}
