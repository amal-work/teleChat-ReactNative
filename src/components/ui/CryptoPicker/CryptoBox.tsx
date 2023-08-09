import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Icons } from 'environment';
import { Icon } from '../Icon';

import styles from './CryptoBox.style';

interface Props {
	title: string;
	selectedCrypto?: string;
	icon: (icons: typeof Icons) => React.FC<SvgProps>;
	onSelect?: (item: string) => void;
}

export function CryptoBox({ title, selectedCrypto, icon, onSelect }: Props) {
	function handleSelectedItem() {
		!!onSelect && onSelect(title);
	}

	let selectedItem = selectedCrypto === title;

	return (
		<View style={[styles.container, selectedItem && styles.selected]}>
			<TouchableOpacity
				style={styles.content}
				activeOpacity={0.7}
				onPress={handleSelectedItem}>
				<Icon type={icon} size={40} />
				<Text style={styles.text}>{title}</Text>
			</TouchableOpacity>
		</View>
	);
}
