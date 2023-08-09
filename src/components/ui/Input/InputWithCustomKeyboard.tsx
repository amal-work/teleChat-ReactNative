import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { useSpring } from 'react-spring';

import { Colors, Typography } from 'environment';
import { Spring } from '../Spring';
import { useDimensions } from 'hooks';

interface Props {
	label: string;
	value: string;
	disabled: boolean;
	isFocused: boolean;
	onFocus: () => void;
	buttonComponent?: React.ReactElement;
	customKeyboard: React.ReactElement;
}

const DEFAULT_LABEL_PROPS = {
	top: 0,
	fontSize: 16
};

const ANIMATED_LABEL_PROPS = {
	top: -20,
	fontSize: 12
};

export function InputWithCustomKeyboard({
	label,
	value,
	disabled,
	isFocused,
	onFocus,
	buttonComponent,
	customKeyboard
}: Props) {
	const { isSmallDevice } = useDimensions();

	function getLabelAnimation(isFocused: boolean) {
		let labelProps = isFocused ? ANIMATED_LABEL_PROPS : DEFAULT_LABEL_PROPS;

		return useSpring({
			...labelProps,
			config: { duration: 150 }
		});
	}

	const labelAnimation = getLabelAnimation(isFocused);

	return (
		<View style={{ marginTop: 10, marginBottom: 30 }}>
			<TouchableWithoutFeedback onPress={onFocus} disabled={disabled}>
				<View
					style={[
						{
							position: 'relative',
							justifyContent: 'center',
							height: 30,
							width: '100%',
							borderBottomWidth: 1,
							borderBottomColor: Colors.gray[2]
						},
						isFocused && {
							marginVertical: isSmallDevice ? 10 : 30,
							borderBottomColor: Colors.blue[6]
						}
					]}>
					<Spring.Text
						style={[
							{
								...Typography.body.medium,
								color: Colors.gray[4],
								position: 'absolute'
							},
							labelAnimation
						]}>
						{label}
					</Spring.Text>
					{isFocused && (
						<Text style={{ ...Typography.header.medium }}>{value}</Text>
					)}
				</View>
			</TouchableWithoutFeedback>
			{isFocused && (
				<View>
					<View style={{ marginVertical: 20 }}>{buttonComponent}</View>
					<View style={{ height: isSmallDevice ? 165 : 300 }}>
						{customKeyboard}
					</View>
				</View>
			)}
		</View>
	);
}
