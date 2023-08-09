import React from 'react';
import { Text, View } from 'react-native';

import { Icon } from 'components/ui';

import styles from './AuthHeader.style';
import { Colors } from 'environment';

interface Props {
	onButtonPress?: () => void;
	title: string;
}

export function AuthHeader({ onButtonPress, title }: Props) {
	return (
		<View style={styles.container}>
			<View style={styles.iconsContainer}>
				{!!onButtonPress && (
					<Icon
						type={(icons) => icons.ArrowLeft}
						size={25}
						color={Colors.gray[6]}
						onPress={onButtonPress}
					/>
				)}
			</View>
			<View style={styles.titleContainer}>
				<Icon type={(icons) => icons.Arrows} size={45} color={Colors.blue[6]} />
				<Text style={styles.title}>{title}</Text>
			</View>
			<View style={{ flex: 1 }} />
		</View>
	);
}
