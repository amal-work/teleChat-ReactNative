import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useSpring } from 'react-spring';

import { Spring } from 'components/ui/Spring';
import { Colors } from 'environment';

interface Props {
	onPress: () => void;
}

export function Switcher({ onPress }: Props) {
	const [active, setActive] = useState(false);

	function handleOnPress() {
		onPress();
		setActive((state) => !state);
	}

	const { right, trackColor, thumbColor } = useSpring({
		right: active ? 0 : 7,
		trackColor: !active ? Colors.gray[2] : Colors.blue[2],
		thumbColor: !active ? Colors.gray[6] : Colors.blue[6],
		config: { duration: 150 }
	});
	return (
		<TouchableOpacity activeOpacity={0.8} onPress={handleOnPress}>
			<Spring.View style={[styles.track, { backgroundColor: trackColor }]}>
				<Spring.View
					style={[styles.thumb, { right, backgroundColor: thumbColor }]}
				/>
			</Spring.View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	track: {
		position: 'relative',
		width: 22,
		height: 11,
		borderRadius: 5
	},
	thumb: {
		position: 'absolute',
		top: -2,
		zIndex: 1,
		borderRadius: 9,
		height: 15,
		width: 15
	}
});
