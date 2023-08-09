import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import { NumberButton } from 'components/ui';
import { useDimensions } from 'hooks';

interface Props {
	pin?: boolean;
	fingerprint?: boolean;
	disabled?: boolean;
	onPress?: (e: string) => void;
	onDelete?: () => void;
	onBackPress?: () => void;
	onIconPress?: () => void;
	containerStyle?: StyleProp<ViewStyle>;
	numberContainerStyle?: StyleProp<ViewStyle>;
}

export function NumberPad({
	pin = false,
	fingerprint,
	disabled,
	onPress,
	onDelete,
	onBackPress,
	onIconPress,
	containerStyle,
	numberContainerStyle
}: Props) {
	const { isSmallDevice } = useDimensions();

	return (
		<View style={[{ flex: 1 }, containerStyle]}>
			<View style={styles(isSmallDevice).container}>
				<NumberButton
					containerStyle={numberContainerStyle}
					number='1'
					onPress={onPress}
					disabled={disabled}
				/>
				<NumberButton
					containerStyle={numberContainerStyle}
					number='2'
					onPress={onPress}
					disabled={disabled}
				/>
				<NumberButton
					containerStyle={numberContainerStyle}
					number='3'
					onPress={onPress}
					disabled={disabled}
				/>
			</View>
			<View style={styles(isSmallDevice).container}>
				<NumberButton
					containerStyle={numberContainerStyle}
					number='4'
					onPress={onPress}
					disabled={disabled}
				/>
				<NumberButton
					containerStyle={numberContainerStyle}
					number='5'
					onPress={onPress}
					disabled={disabled}
				/>
				<NumberButton
					containerStyle={numberContainerStyle}
					number='6'
					onPress={onPress}
					disabled={disabled}
				/>
			</View>
			<View style={styles(isSmallDevice).container}>
				<NumberButton
					containerStyle={numberContainerStyle}
					number='7'
					onPress={onPress}
					disabled={disabled}
				/>
				<NumberButton
					containerStyle={numberContainerStyle}
					number='8'
					onPress={onPress}
					disabled={disabled}
				/>
				<NumberButton
					containerStyle={numberContainerStyle}
					number='9'
					onPress={onPress}
					disabled={disabled}
				/>
			</View>
			<View style={styles(isSmallDevice).bottomRow}>
				{pin ? (
					<NumberButton
						containerStyle={numberContainerStyle}
						icon={(icons) => icons.ArrowLeft}
						onIconPress={onBackPress}
						disabled={disabled}
					/>
				) : (
					<NumberButton
						containerStyle={numberContainerStyle}
						number='.'
						onPress={onPress}
						disabled={disabled}
					/>
				)}
				<NumberButton
					containerStyle={numberContainerStyle}
					number='0'
					onPress={onPress}
					disabled={disabled}
				/>
				{fingerprint ? (
					<NumberButton
						containerStyle={numberContainerStyle}
						icon={(icons) => icons.Fingerprint}
						onIconPress={onIconPress}
						disabled={disabled}
					/>
				) : !pin ? (
					<NumberButton
						containerStyle={numberContainerStyle}
						number='x'
						onPress={onDelete}
						disabled={pin}
					/>
				) : (
					<View style={styles(isSmallDevice).fakeButton} />
				)}
			</View>
		</View>
	);
}

const styles = (smallDevice: boolean) =>
	StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginBottom: smallDevice ? 15 : 30
		},
		bottomRow: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			flex: 1
		},
		fakeButton: {
			width: smallDevice ? 63 : 80,
			height: smallDevice ? 45 : 60,
			justifyContent: 'center',
			alignItems: 'center',
			marginHorizontal: 15
		}
	});
