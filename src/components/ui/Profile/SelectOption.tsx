import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Typography, Icons, Colors } from 'environment';
import { Icon } from '../Icon';
import { Switcher } from '../Switcher';

interface Props {
	icon: (icons: typeof Icons) => React.FC<SvgProps>;
	disabled?: boolean;
	optionName: string;
	warning?: boolean;
	onPress?: () => void;
	onSwitchPress?: () => void;
}

export function SelectOption({
	disabled = false,
	icon,
	optionName,
	warning,
	onPress,
	onSwitchPress
}: Props) {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				activeOpacity={0.25}
				disabled={disabled}
				style={styles.content}
				onPress={onPress}>
				<Icon
					type={icon}
					size={22}
					color={warning ? Colors.red[10] : undefined}
				/>
				<Text style={[styles.title, warning && { color: Colors.red[10] }]}>
					{optionName}
				</Text>
			</TouchableOpacity>
			{onSwitchPress && <Switcher onPress={onSwitchPress} />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 20
	},
	title: { ...Typography.body.large, marginLeft: 16 }
});
