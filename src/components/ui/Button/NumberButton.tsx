import React from 'react';
import {
	Text,
	TouchableOpacity,
	StyleSheet,
	StyleProp,
	ViewStyle
} from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Colors, Typography, Fonts, Icons } from 'environment';
import { Icon } from '../Icon';
import { useDimensions } from 'hooks';

interface Props {
	number?: string;
	icon?: (icons: typeof Icons) => React.FC<SvgProps>;
	disabled?: boolean;
	onPress?: (e: string) => void;
	onIconPress?: () => void;
	containerStyle?: StyleProp<ViewStyle>;
}

export function NumberButton({
	number,
	icon,
	onPress,
	onIconPress,
	disabled,
	containerStyle
}: Props) {
	const { isSmallDevice } = useDimensions();

	function onNumberPress() {
		if (number && onPress) {
			onPress(number);
		}
	}

	return (
		<TouchableOpacity
			style={[styles(isSmallDevice).container, containerStyle]}
			onPress={onNumberPress}
			disabled={disabled}>
			{!!icon ? (
				<Icon
					type={icon}
					color={Colors.gray[8]}
					size={25}
					onPress={onIconPress}
				/>
			) : (
				<Text style={styles(isSmallDevice).text}>{number}</Text>
			)}
		</TouchableOpacity>
	);
}

const styles = (smallDevice: boolean) =>
	StyleSheet.create({
		container: {
			width: smallDevice ? 63 : 80,
			height: smallDevice ? 45 : 60,
			justifyContent: 'center',
			alignItems: 'center',
			marginHorizontal: 15
		},
		text: {
			...Typography.header.large,
			color: Colors.gray[8],
			fontFamily: Fonts.bold
		}
	});
