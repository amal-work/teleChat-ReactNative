import React, { useState } from 'react';
import {
	TextInput,
	Text,
	View,
	NativeSyntheticEvent,
	TextInputKeyPressEventData,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
	TextStyle
} from 'react-native';
import { useSpring } from 'react-spring';

import { KeyboardType, ReturnKey } from 'consts';
import { Colors } from 'environment';
import { Icon } from '../Icon';

import styles from './Input.style';
import { Spring } from '../Spring';

const DEFAULT_LABEL_PROPS = {
	top: 0,
	fontSize: 16
};

const ANIMATED_LABEL_PROPS = {
	top: -20,
	fontSize: 12
};

export interface InputProps {
	value: string;
	error?: string;
	label?: string;
	currency?: string;
	password?: boolean;
	autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
	maxLength?: number;
	hasIcon?: boolean;
	disabled?: boolean;
	caretHidden?: boolean;
	inputAccessoryId?: string;
	clearTextOnFocus?: boolean;
	keyboardType?: KeyboardType;
	returnKeyType?: ReturnKey;
	style?: StyleProp<TextStyle>;
	labelStyle?: StyleProp<TextStyle>;
	containerStyle?: StyleProp<ViewStyle>;
	onChangeText: void | ((text: string) => void);
	onIconPress?: () => void;
	onKeyPress?: (
		event: NativeSyntheticEvent<TextInputKeyPressEventData>
	) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	onSubmit?: () => void;
}

function getLabelAnimation(value: string, isFocused: boolean, error?: string) {
	let labelProps = value?.length ? ANIMATED_LABEL_PROPS : DEFAULT_LABEL_PROPS;

	if (isFocused) {
		labelProps = ANIMATED_LABEL_PROPS;
	}

	return useSpring({
		...labelProps,
		color: !!error ? Colors.red[10] : Colors.gray[6],
		config: { duration: 150 }
	});
}

function getErrorAnimation(error?: string) {
	return useSpring({
		opacity: !!error ? 1 : 0,
		config: { duration: 150 }
	});
}

export const Input = React.forwardRef<TextInput, InputProps>(
	(
		{
			value,
			error,
			label,
			currency,
			password,
			autoCapitalize = 'none',
			maxLength,
			hasIcon,
			disabled,
			caretHidden,
			inputAccessoryId,
			clearTextOnFocus,
			keyboardType,
			returnKeyType,
			style,
			containerStyle,
			labelStyle,
			onChangeText,
			onIconPress,
			onKeyPress,
			onFocus,
			onBlur,
			onSubmit
		},
		ref
	) => {
		const [isFocused, setIsFocused] = useState(false);

		function handleFocus() {
			if (!isFocused) {
				setIsFocused(true);

				if (onFocus) {
					onFocus();
				}
			}
		}

		function handleBlur() {
			if (isFocused) {
				setIsFocused(false);
			}

			if (onBlur) {
				onBlur();
			}
		}

		const labelAnimation = getLabelAnimation(value, isFocused, error);
		const errorAnimation = getErrorAnimation(error);

		return (
			<View style={[styles.container, containerStyle]}>
				{label && (
					<Spring.Text style={[styles.label, labelStyle, labelAnimation]}>
						{label}
					</Spring.Text>
				)}
				<TextInput
					ref={ref}
					value={value}
					secureTextEntry={password}
					autoCorrect={false}
					autoCapitalize={autoCapitalize}
					inputAccessoryViewID={inputAccessoryId}
					keyboardType={keyboardType}
					returnKeyType={returnKeyType}
					maxLength={!!currency ? 30 : maxLength}
					editable={!disabled}
					clearTextOnFocus={clearTextOnFocus}
					caretHidden={caretHidden}
					underlineColorAndroid={Colors.transparent}
					style={[
						styles.input,
						{
							borderBottomColor: !!error
								? Colors.red[10]
								: isFocused
								? Colors.blue[6]
								: Colors.gray[6]
						},
						disabled && { color: Colors.gray[4] },
						style
					]}
					// @ts-ignore
					onChangeText={onChangeText}
					onKeyPress={onKeyPress}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onSubmitEditing={onSubmit}
				/>
				{!!currency && <Text style={styles.currency}>{currency}</Text>}
				<Spring.Text
					style={[
						(error as string)?.length > 35 ? styles.errorLarge : styles.error,
						errorAnimation
					]}>
					{error}
				</Spring.Text>
				{hasIcon && (
					<TouchableOpacity
						style={[styles.currency, { transform: [{ rotateY: '110' }] }]}
						onPress={onIconPress}>
						<Icon type={(icons) => icons.ArrowLeft} />
					</TouchableOpacity>
				)}
			</View>
		);
	}
);
