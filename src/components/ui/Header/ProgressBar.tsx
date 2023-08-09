import React from 'react';
import { View } from 'react-native';
import { useSpring } from 'react-spring';

import { Colors } from 'environment';
import { Spring } from '../Spring';

interface Props {
	to?: number;
	from?: number;
	whiteContent?: boolean;
}

export function ProgressBar({ from, to, whiteContent }: Props) {
	const style = useSpring({
		from: { width: `${from ?? 0}%` },
		to: { width: `${to}%` }
	});

	if (to === undefined) {
		return null;
	}

	return (
		<View
			style={{
				height: 4,
				backgroundColor: whiteContent ? Colors.green[8] : Colors.gray[1],
				borderRadius: 2,
				marginHorizontal: 20,
				marginTop: 8
			}}
		>
			<Spring.View
				style={[
					style,
					{
						height: '100%',
						backgroundColor: whiteContent ? Colors.white : Colors.green[6],
						borderRadius: 2
					}
				]}
			/>
		</View>
	);
}
