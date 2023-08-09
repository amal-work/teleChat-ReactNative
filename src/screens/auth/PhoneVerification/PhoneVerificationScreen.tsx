import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell
} from 'react-native-confirmation-code-field';

import { AuthHeader } from 'components/features';
import {
	Icon,
	PrimaryButton,
	KeyboardDismissal,
	GhostButton
} from 'components/ui';
import {
	useDimensions,
	useConfirmCode,
	useRequestConfirmation,
	useAuthContext
} from 'hooks';
import { Colors } from 'environment';
import { Routes } from 'types';

import {
	PhoneVerificationScreenNavigationProp,
	PhoneVerificationScreenRouteProp
} from './PhoneVerificationScreen.types';
import styles from './PhoneVerificationScreen.style';
import commonStyles from '../auth.styles';
import screenStyles from '../../screens.style';
import { StorageKey } from 'consts';

const CELL_COUNT = 6;

interface Props {
	navigation: PhoneVerificationScreenNavigationProp;
	route: PhoneVerificationScreenRouteProp;
}

export function PhoneVerification({
	navigation: { navigate, goBack },
	route
}: Props) {
	const { params } = route;
	const [value, setValue] = useState('');
	const [minutes, setMinutes] = useState(1);
	const [seconds, setSeconds] = useState(0);
	const [resend, setResend] = useState(true);

	const { isSmallDevice } = useDimensions();
	const [confirmCode, { loading }] = useConfirmCode();
	const [requestConfirmation] = useRequestConfirmation();
	// const { registerDevice } = useNotification();
	const { login: localLogin } = useAuthContext();

	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue
	});

	const scrollRef = useRef<ScrollView>(null);

	function handleFocus() {
		if (scrollRef.current) {
			scrollRef.current.scrollTo({ y: 140 });
		}
	}

	useEffect(() => {
		let timing = setTimeout(() => {
			if (seconds === 0 && minutes !== 0) {
				setSeconds(59);
				setMinutes(minutes - 1);
			} else if (seconds !== 0) {
				setSeconds(seconds - 1);
			} else {
				setResend(false);
			}
			return () => {
				clearTimeout(timing);
			};
		}, 1000);
	}, [minutes, seconds]);
	let countdown = minutes + 'm ' + seconds + 's ';

	const handleCodeConfirmation = async () => {
		// try {
		// 	const completeToken = await confirmCode({ variables: { code: value } });
		// 	if (completeToken && completeToken.data) {
		// 		await AsyncStorage.setItem(
		// 			StorageKey.Token,
		// 			completeToken.data.confirmCode
		// 		);
		// 		if (params.socialMedia) {
		// 			console.log('completeToken', completeToken);
		// 			await AsyncStorage.setItem(StorageKey.Key, params.socialMedia);
		// 			// await registerDevice();
		// 			localLogin(true);
		// 		} else {
		// 			console.log('completeToken', completeToken);
		// 			navigate(Routes.AboutYou);
		// 		}
		// 	}
		// } catch (e) {
		// 	console.log('confirmCode error', e);
		// }
		navigate(Routes.AboutYouSocialMedia);
	};

	return (
		<KeyboardDismissal
			scrollRef={scrollRef}
			contentContainerStyle={[
				screenStyles.list,
				isSmallDevice && { paddingBottom: 250 }
			]}>
			<View style={{ justifyContent: 'flex-end' }}>
				<AuthHeader title='Coins App' onButtonPress={() => goBack()} />
				<View style={styles.titleContainer}>
					<Text style={commonStyles.title}>Verify phone number</Text>
					<Text style={commonStyles.subtitle}>
						Enter the code sent to Your Phone to complete creating your account.
					</Text>
				</View>
				<ScrollView bounces={false}>
					<View style={styles.iconContainer}>
						<Icon
							type={(icons) => icons.Envelope}
							size={135}
							color={Colors.blue[6]}
						/>
					</View>
					<View style={{ marginBottom: 36 }}>
						<CodeField
							{...props}
							ref={ref}
							value={value}
							onChangeText={setValue}
							onFocus={handleFocus}
							cellCount={CELL_COUNT}
							keyboardType='number-pad'
							renderCell={({ index, symbol, isFocused }) => (
								<View
									key={index}
									style={[
										styles.inputContainer,
										isFocused && {
											borderColor: Colors.green[10]
										}
									]}>
									<Text
										style={[styles.input, isSmallDevice && { width: 40 }]}
										onLayout={getCellOnLayoutHandler(index)}>
										{symbol || (isFocused ? <Cursor /> : null)}
									</Text>
								</View>
							)}
						/>
					</View>
					<PrimaryButton
						title='Verify Phone'
						onPress={handleCodeConfirmation}
						loading={loading}
					/>
					<GhostButton
						containerStyle={{ marginTop: 15 }}
						title={resend ? `Resend code in ${countdown}` : 'Resend Code'}
						onPress={async () => {
							await requestConfirmation({ variables: { phone: params.phone } });
							setResend(true);
							setMinutes(1);
						}}
						disabled={resend}
					/>
				</ScrollView>
			</View>
		</KeyboardDismissal>
	);
}
