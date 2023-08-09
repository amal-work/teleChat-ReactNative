import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { ActionSheet, Header, Icon } from 'components/ui';
import { Colors } from 'environment';
import { useCallbackOnce } from 'hooks';
import { PinScreen } from '../pin';
import { TransactionModal } from '../transactionModal';

interface Props {
	transactionType: string;
	modalVisibility: boolean;
	handleOnCloseModal: () => void;
}

export function Transfer({
	transactionType,
	modalVisibility,
	handleOnCloseModal
}: Props) {
	const [nextSlide, setNextSlide] = useState(false);
	const [pin, setPin] = useState('');

	const checkPin = useCallbackOnce(() => {
		// pin check from backend
		closeModal();
	});

	useEffect(() => {
		if (pin.length === 4) {
			checkPin();
		}
	}, [checkPin, pin]);

	function closeModal() {
		handleOnCloseModal();
		setNextSlide(false);
	}

	return (
		<ActionSheet visible={modalVisibility} onClose={closeModal}>
			{!nextSlide ? (
				<TransactionModal
					transactionType={transactionType}
					handleOnCloseModal={closeModal}
					onButtonPress={() => setNextSlide(true)}
				/>
			) : (
				<PinScreen
					modal
					headerComponent={
						<Header
							transparent
							leftComponent={
								<TouchableOpacity
									activeOpacity={0.5}
									style={{ flex: 1 }}
									onPress={() => setNextSlide(false)}>
									<Icon
										type={(icons) => icons.ArrowLeft}
										size={24}
										color={Colors.gray[4]}
									/>
								</TouchableOpacity>
							}
							title='Enter Pin'
							rightComponent={
								<View
									style={{
										flex: 1,
										alignItems: 'flex-end'
									}}>
									<Text style={{ color: Colors.blue[6] }}>2/2</Text>
								</View>
							}
						/>
					}
					operationTitle='Enter Pin'
					pin={pin}
					setPin={(e) => setPin(e)}
					onBackPress={() => setNextSlide(false)}
				/>
			)}
		</ActionSheet>
	);
}
