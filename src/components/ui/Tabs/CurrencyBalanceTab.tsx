import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { TabProps } from 'types';

import styles from './Tab.style';

export function CurrencyBalanceTab({
	label,
	active = false,
	last = false,
	onMeasure,
	onTabChange,
	containerStyle
}: TabProps) {
	return (
		<TouchableOpacity
			activeOpacity={1}
			style={[containerStyle, last && styles.last]}
			onLayout={onMeasure}
			onPress={onTabChange}
		>
			<Text
				style={[
					styles.currencyBalanceTab,
					active && styles.currencyBalanceActive
				]}
			>
				{label}
			</Text>
		</TouchableOpacity>
	);
}
