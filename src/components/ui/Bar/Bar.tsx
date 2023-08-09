import React from 'react';
import { View } from 'react-native';

import { Colors } from 'environment';

export function Bar() {
	return (
		<View
			style={{
				height: 4,
				width: 32,
				borderRadius: 2,
				backgroundColor: Colors.gray[1],
				alignSelf: 'center',
				marginTop: 8
			}}
		/>
	);
}
