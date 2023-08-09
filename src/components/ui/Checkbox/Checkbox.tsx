import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

import { Colors } from 'environment';

import { Icon } from '../Icon';

interface Props {
	value?: boolean;
	size?: number;
	onPress?: (value: boolean) => void;
}

export function Checkbox({ value = false, size = 16, onPress }: Props) {
	const [checked, setChecked] = useState(value);

	useEffect(() => {
		onPress && onPress(checked);
	}, [checked, onPress]);

	useEffect(() => {
		if (value !== checked) {
			setChecked(value);
		}
	}, [checked, value]);

	function handleCheck() {
		setChecked((state) => !state);
	}

	return (
		<View>
			<TouchableOpacity
				activeOpacity={1}
				style={checked ? styles(size).active : styles(size).inactive}
				onPress={handleCheck}>
				{checked && <Icon type={(icons) => icons.Check} size={size / 2} />}
			</TouchableOpacity>
		</View>
	);
}

const styles = (size: number) =>
	StyleSheet.create({
		inactive: {
			height: size,
			width: size,
			borderWidth: 1,
			borderRadius: size / 2,
			borderColor: Colors.gray[4]
		},
		active: {
			height: size,
			width: size,
			borderWidth: 1.5,
			borderRadius: size / 2,
			backgroundColor: Colors.blue[4],
			borderColor: Colors.blue[6],
			alignItems: 'center',
			justifyContent: 'center'
		}
	});
