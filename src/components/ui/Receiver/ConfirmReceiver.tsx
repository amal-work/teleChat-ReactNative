import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { ActionSheet } from '../ActionSheet';
import { Icon } from '../Icon';
import { PrimaryButton } from '../Button';

import styles from './ConfirmReceiver.style';
import { PinScreen } from 'components/features';

interface Props {
	name: string;
	id: string;
	currency: string;
	value: string;
	open: boolean;
	onClose: () => void;
	onPressButton?: () => void;
}

export function ConfirmReceiver({
	name,
	id,
	currency,
	value,
	open,
	onClose,
	onPressButton
}: Props) {
	const [showPin, setShowPin] = useState(false);
	const [pin, setPin] = useState('');

	function handleOnPress() {
		onPressButton && onPressButton();
		setShowPin(true);
	}

	function handleOnClose() {
		onClose();
		setShowPin(false);
	}

	return (
		<ActionSheet
			contentStyle={styles.container}
			visible={open}
			onClose={handleOnClose}>
			{!showPin ? (
				<>
					<Icon type={(icons) => icons.Bank} style={styles.avatar} size={40} />
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.id}>{id}</Text>
					<View style={styles.moneyContainer}>
						<Text style={styles.currency}>{currency}</Text>
						<Text style={styles.value}>{value}</Text>
					</View>
					<PrimaryButton title='Confirm' onPress={handleOnPress} />
				</>
			) : (
				<PinScreen
					modal
					operationTitle='Enter Pin'
					pin={pin}
					setPin={(e) => setPin(e)}
				/>
			)}
		</ActionSheet>
	);
}
