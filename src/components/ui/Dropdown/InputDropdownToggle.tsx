import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { animated, useSpring } from 'react-spring';

import { Colors } from 'environment';
import { Icon } from '../Icon';

import styles from './InputDropdownToggle.style';

const AnimatedText = animated(Text);

const DEFAULT_LABEL_PROPS = {
	top: -5,
	fontSize: 16
};

const ANIMATED_LABEL_PROPS = {
	top: -20,
	fontSize: 12
};

function getLabelAnimation(value: string, isSelected: boolean) {
	let labelProps = value.length ? ANIMATED_LABEL_PROPS : DEFAULT_LABEL_PROPS;

	if (isSelected) {
		labelProps = ANIMATED_LABEL_PROPS;
	}

	return useSpring({
		...labelProps,
		config: { duration: 150 }
	});
}

interface Props {
	label: string;
	selectedItem: string;
	onPress: () => void;
}

export function InputDropdownToggle({ label, selectedItem, onPress }: Props) {
	const labelAnimation = getLabelAnimation(selectedItem, !!selectedItem);

	return (
		<View style={styles.container}>
			<AnimatedText style={[styles.label, labelAnimation]}>
				{label}
			</AnimatedText>
			<TouchableOpacity
				activeOpacity={1}
				style={[
					styles.input,
					selectedItem.length > 0 && {
						borderBottomColor: Colors.green[10]
					}
				]}
				onPress={onPress}>
				<Text>{selectedItem}</Text>
			</TouchableOpacity>
			<View style={styles.icon}>
				<Icon type={(icons) => icons.ChevronDown} size={16} />
			</View>
		</View>
	);
}
