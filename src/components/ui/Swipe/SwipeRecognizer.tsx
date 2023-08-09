import React from 'react';
import { Text } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Colors } from 'environment';
import { Icon } from '../Icon';
import { Spring } from '../Spring';
//Properties interface
interface Props {
	children: React.ReactElement;
	archiveAction: () => void;
	deleteAction: () => void;
}

export function SwipeRecognizer({
	children,
	archiveAction,
	deleteAction
}: Props) {
	const renderRightActions = (progress, dragX) => {
		const deleteAnimation = dragX.interpolate({
			inputRange: [0, 80],
			outputRange: [80, 120]
		});
		const archiveAnimation = dragX.interpolate({
			inputRange: [0, 40],
			outputRange: [160, 200]
		});

		return (
			<>
				<Spring.TouchableOpacity
					activeOpacity={0.8}
					style={[
						{
							backgroundColor: Colors.red[8],
							justifyContent: 'center',
							alignItems: 'center',
							height: '100%',
							width: 80
						},
						{
							transform: [{ translateX: deleteAnimation }]
						}
					]}
					onPress={deleteAction}>
					<Icon type={(icons) => icons.Trash} />
					<Text style={{ color: 'white' }}>Delete</Text>
				</Spring.TouchableOpacity>
				<Spring.TouchableOpacity
					activeOpacity={0.8}
					style={[
						{
							backgroundColor: Colors.blue[6],
							justifyContent: 'center',
							alignItems: 'center',
							height: '100%',
							width: 80
						},
						{
							transform: [{ translateX: archiveAnimation }]
						}
					]}
					onPress={archiveAction}>
					<Icon type={(icons) => icons.Archive} />
					<Text style={{ color: 'white' }}>Archive</Text>
				</Spring.TouchableOpacity>
			</>
		);
	};

	return (
		<Swipeable
			renderRightActions={renderRightActions}
			childrenContainerStyle={{ paddingHorizontal: 20 }}>
			{children}
		</Swipeable>
	);
}
