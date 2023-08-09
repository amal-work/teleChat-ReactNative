import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import {
	PrimaryButton,
	InputWithCustomKeyboard,
	Header,
	Icon
} from 'components/ui';
import { NumberPad } from '../numberPad';
import { Colors } from 'environment';
import { SelectCryptoCurrency } from '../wallet';
import { useDimensions } from 'hooks';

interface Props {
	transactionType: string;
	handleOnCloseModal?: () => void;
	onButtonPress?: () => void;
	navigate?: () => void;
}

export function TransactionModal({
	transactionType,
	handleOnCloseModal,
	onButtonPress,
	navigate
}: Props) {
	const [crypto, setSelectCrypto] = useState('');
	const [amount, setAmount] = useState('');
	const [noMoreDot, setNoMoreDot] = useState(false);
	const [focusInput, setFocusInput] = useState(false);

	const { isSmallDevice } = useDimensions();

	function selectCrypto(coin: string) {
		setSelectCrypto(coin);
	}

	function handlAmountChange(number: string) {
		if (number === '.') {
			setNoMoreDot(true);
		}
		setAmount((props) => {
			if (number !== '.') {
				let money = props + number;
				let convertToNumber = parseFloat(money.replace(/,/g, ''));
				return Number(convertToNumber).toLocaleString();
			} else {
				if (!noMoreDot) {
					return props + number;
				}
				return props;
			}
		});
	}

	function handleDeleteAmount() {
		if (amount.lastIndexOf('.')) {
			setNoMoreDot(false);
		}
		if (amount.length > 0) {
			setAmount(amount.substring(0, amount.length - 1));
		}
	}

	function closeModal() {
		if (handleOnCloseModal) {
			setFocusInput(false);
			setAmount('');
			setNoMoreDot(false);
			handleOnCloseModal();
		}
	}

	function handleOnFocus() {
		setFocusInput(true);
	}

	function handleOnButtonPress() {
		if (navigate) {
			navigate();
			closeModal();
		}
		if (onButtonPress) {
			console.log('button pressed');
			onButtonPress();
		}
	}

	return (
		<>
			<View style={styles.bar} />
			<Header
				transparent
				leftComponent={
					<TouchableOpacity
						activeOpacity={0.5}
						style={{ flex: 1 }}
						onPress={closeModal}>
						<Icon
							type={(icons) => icons.ArrowLeft}
							size={24}
							color={Colors.gray[4]}
						/>
					</TouchableOpacity>
				}
				title={`${transactionType} money`}
				rightComponent={
					<View
						style={{
							flex: 1,
							alignItems: 'flex-end'
						}}>
						<Text style={{ color: Colors.blue[6] }}>1/2</Text>
					</View>
				}
			/>
			<SelectCryptoCurrency
				selectedCrypto={crypto}
				handleSelectCrypto={selectCrypto}
			/>
			<InputWithCustomKeyboard
				label='Withdrawal amount'
				value={amount}
				isFocused={focusInput}
				onFocus={handleOnFocus}
				disabled={crypto.length == 0}
				buttonComponent={
					<PrimaryButton
						title={`${transactionType} money`}
						onPress={handleOnButtonPress}
						disabled={amount.length == 0}
					/>
				}
				customKeyboard={
					<NumberPad
						numberContainerStyle={isSmallDevice && { height: 33 }}
						onPress={handlAmountChange}
						onDelete={handleDeleteAmount}
					/>
				}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	bar: {
		height: 4,
		width: 32,
		borderRadius: 2,
		backgroundColor: Colors.gray[1],
		alignSelf: 'center',
		marginTop: 8
	}
});
