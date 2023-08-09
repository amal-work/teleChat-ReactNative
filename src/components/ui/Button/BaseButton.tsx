import React from 'react';
import {
	Text,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
	ActivityIndicator,
	View
} from 'react-native';

import { Icon } from '../Icon';
import { SvgProps } from 'react-native-svg';
import { Icons, Colors } from 'environment';

import styles from './BaseButton.style';

interface BaseButtonProps {
	title: string;
	icon?: (icons: typeof Icons) => React.FC<SvgProps>;
	loading?: boolean;
	disabled?: boolean;
	ghost?: boolean;
	invertColor?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
	onPress: () => void;
}

export type ButtonProps = BaseButtonProps;

interface StyleProps {
	backgroundColor: string;
	titleColor?: string;
	borderColor?: string;
	disabledColor?: string;
}

type Props = BaseButtonProps & StyleProps;

export function BaseButton({
	title,
	icon,
	loading,
	disabled,
	ghost,
	invertColor,
	onPress,
	containerStyle,
	backgroundColor,
	titleColor = 'white',
	borderColor = backgroundColor,
	disabledColor
}: Props) {
	const baseContainerStyle = [
		styles.container,
		containerStyle,
		{ backgroundColor, borderColor },
		invertColor && !ghost && { backgroundColor: Colors.white },
		invertColor && ghost && { borderColor: Colors.white }
	];

	const containerStyles = [
		...baseContainerStyle,
		disabled &&
			!!disabledColor && {
				backgroundColor: ghost ? backgroundColor : disabledColor,
				borderColor: disabledColor
			},
		disabled && !disabledColor && styles.disabled
	];

	const titleStyles = [
		styles.title,
		{ color: ghost && disabled ? disabledColor : titleColor },
		loading && { opacity: 0 },
		invertColor && !ghost && { color: Colors.blue[6] },
		invertColor && ghost && { color: Colors.white }
	];

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			style={containerStyles}
			disabled={disabled}
			onPress={onPress}>
			{icon && (
				<View style={styles.iconContainer}>
					<Icon
						type={icon}
						color={ghost && disabled ? disabledColor : titleColor}
					/>
				</View>
			)}
			<Text style={titleStyles}>{title}</Text>
			{loading && (
				<ActivityIndicator size={20} color={titleColor} style={styles.loader} />
			)}
		</TouchableOpacity>
	);
}
