import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { TabProps } from 'types';

import styles from './Tab.style';

export function Tab({
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
			style={[styles.container, containerStyle, last && styles.last]}
			onLayout={onMeasure}
			onPress={onTabChange}
		>
			<Text style={[styles.tab, active && styles.active]}>{label}</Text>
		</TouchableOpacity>
	);
}
