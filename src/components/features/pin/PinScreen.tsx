import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleProp, ViewStyle } from 'react-native';

import { NumberPad } from 'components/features';
import { SecurePinView } from 'components/ui';
import { useDimensions } from 'hooks';

import styles from './PinScreen.style';

interface Props {
	containerStyles?: StyleProp<ViewStyle>;
	numberPadContainerStyle?: StyleProp<ViewStyle>;
	headerComponent?: React.ReactElement;
	operationTitle: string;
	pin: string;
	modal?: boolean;
	error?: string;
	setPin: (text: string) => void;
	onBackPress?: () => void;
}

export function PinScreen({
	containerStyles,
	numberPadContainerStyle,
	headerComponent,
	operationTitle,
	pin,
	setPin,
	modal,
	error,
	onBackPress
}: Props) {
	const [stop, setStop] = useState(false);

	// const translate = useTranslation();
	const { isSmallDevice } = useDimensions();

	function handlePin(number: string) {
		let newPin = pin + number;

		if (!stop) {
			setPin(newPin);
		}
	}

	function handleDeletePin() {
		if (pin.length > 0) {
			setPin(pin.substring(0, pin.length - 1));
		} else {
			!!onBackPress && onBackPress();
		}
	}

	useEffect(() => {
		if (pin.length === 4) {
			setStop(true);
		}
		if (pin.length < 4 && stop) {
			setStop(false);
		}
	}, [pin, stop]);

	return (
		<>
			{!modal ? (
				<SafeAreaView style={styles.container}>
					<View style={containerStyles}>
						<View
							style={[
								styles.titleContainer,
								isSmallDevice && { marginTop: 0 }
							]}>
							<Text style={styles.title}>{operationTitle}</Text>
							{pin.length === 4 && <Text style={styles.subtitle}>{error}</Text>}
						</View>
						<View style={{ flex: 1 }} />
						<View style={{ flex: 7 }}>
							<View style={{ marginBottom: isSmallDevice ? 20 : 40 }}>
								<SecurePinView pinLength={pin.length} />
								<View style={styles.textContainer}>
									<Text style={styles.text}>Forgot your PIN?</Text>
								</View>
							</View>
							<NumberPad
								containerStyle={numberPadContainerStyle}
								pin
								onPress={handlePin}
								disabled={stop}
								onBackPress={handleDeletePin}
							/>
						</View>
					</View>
				</SafeAreaView>
			) : (
				<View style={{ width: '100%' }}>
					<View style={styles.bar} />
					{headerComponent}
					{!headerComponent && (
						<View
							style={[
								styles.modalTitleContainer,
								isSmallDevice && { marginTop: 8 }
							]}>
							<Text style={styles.modalTitle}>{operationTitle}</Text>
							{pin.length === 4 ? (
								<Text style={styles.subtitle}>{error}</Text>
							) : (
								<Text style={styles.subtitle}> </Text>
							)}
						</View>
					)}

					<SecurePinView
						containerStyle={{ paddingVertical: 70 }}
						pinLength={pin.length}
					/>
					<View style={{ height: 300 }}>
						<NumberPad
							pin
							onPress={handlePin}
							disabled={stop}
							onBackPress={handleDeletePin}
						/>
					</View>
				</View>
			)}
		</>
	);
}
