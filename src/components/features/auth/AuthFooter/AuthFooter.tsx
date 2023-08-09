import React from 'react';
import {
	Text,
	TouchableOpacity,
	View,
	StyleProp,
	ViewStyle
} from 'react-native';

import { PrimaryButton, Spring } from 'components/ui';

import styles from './AuthFooter.style';

interface Props {
	disabled: boolean;
	loading?: boolean;
	question: string;
	answer: string;
	containerStyle?: StyleProp<ViewStyle>;
	onPrimaryPress: () => void;
	onAnswerPress: () => void;
}

export function AuthFooter({
	disabled,
	loading,
	question,
	answer,
	containerStyle,
	onPrimaryPress,
	onAnswerPress
}: Props) {
	return (
		<Spring.View style={containerStyle}>
			<PrimaryButton
				title='Join with email'
				disabled={disabled}
				loading={loading}
				containerStyle={styles.button}
				onPress={onPrimaryPress}
			/>
			<View style={styles.row}>
				<Text style={styles.subtitle}>{question}</Text>
				<TouchableOpacity onPress={onAnswerPress}>
					<Text style={styles.text}> {answer}</Text>
				</TouchableOpacity>
			</View>
		</Spring.View>
	);
}
