import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Icon } from '../Icon';
import { Typography, Icons } from 'environment';

interface Props {
	icon: (icons: typeof Icons) => React.FC<SvgProps>;
	iconBackgroundColor?: string;
	iconSize?: number;
	iconColor?: string;
	title: string;
	onPress?: () => void;
}

export function PhoneActionSelector({
	icon,
	iconBackgroundColor,
	iconSize = 17,
	iconColor,
	title,
	onPress
}: Props) {
	return (
		<TouchableOpacity
			style={{ alignItems: 'center' }}
			activeOpacity={0.8}
			disabled={!onPress}
			onPress={onPress}>
			<View
				style={[
					styles.iconContainer,
					!!iconBackgroundColor && { backgroundColor: iconBackgroundColor }
				]}>
				<Icon color={iconColor} type={icon} size={iconSize} />
			</View>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	iconContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		...Typography.body.medium
	}
});
