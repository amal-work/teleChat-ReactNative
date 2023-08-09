import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Colors } from 'environment';

interface Props {
	pinLength: number;
	containerStyle?: StyleProp<ViewStyle>;
}

export function SecurePinView({ pinLength, containerStyle }: Props) {
	return (
		<View style={[styles.container, containerStyle]}>
			<View
				style={[
					styles.circle,
					pinLength > 0 && { backgroundColor: Colors.securePin }
				]}
			/>
			<View
				style={[
					styles.circle,
					pinLength > 1 && { backgroundColor: Colors.securePin }
				]}
			/>
			<View
				style={[
					styles.circle,
					pinLength > 2 && { backgroundColor: Colors.securePin }
				]}
			/>
			<View
				style={[
					styles.circle,
					pinLength > 3 && { backgroundColor: Colors.securePin }
				]}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flexDirection: 'row', justifyContent: 'center' },
	circle: {
		width: 30,
		height: 30,
		borderRadius: 15,
		borderColor: Colors.blue[6],
		borderWidth: 1,
		marginHorizontal: 22.5
	}
});
