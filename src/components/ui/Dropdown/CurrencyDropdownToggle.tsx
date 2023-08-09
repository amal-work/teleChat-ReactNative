import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { Icon } from '../Icon';
import { CurrencyData } from './CurrencyDropdown';
import { Colors } from 'environment';
import styles from './CurrencyDropdownToggle.styles';

const touchableArea = {
	top: 10,
	left: 10,
	bottom: 10,
	right: 10
};

interface Props {
	currency: CurrencyData;
	onPress: () => void;
}

export function CurrencyDropdownToggle({ currency, onPress }: Props) {
	return (
		<TouchableOpacity
			style={styles.wrapper}
			hitSlop={touchableArea}
			onPress={onPress}>
			<Text style={styles.currencyText}>{currency?.abbreviation}</Text>
			<Icon
				type={({ ChevronDown }) => ChevronDown}
				size={12}
				color={Colors.gray[6]}
			/>
		</TouchableOpacity>
	);
}
