import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { Icon } from 'components/ui';

import styles from './PhoneCodeDropdownToggle.styles';

export function PhoneCodeDropdownToggle({ _, selected, onOpen }: any) {
	return (
		<TouchableOpacity style={styles.wrapper} onPress={onOpen}>
			<View style={styles.iconsWrapper}>
				<Image source={{ uri: selected.flag }} style={styles.flag} />
				<Icon type={({ ChevronDown }) => ChevronDown} size={12} />
			</View>
			<Text style={styles.phoneCodeText}>{selected.phoneCode}</Text>
		</TouchableOpacity>
	);
}
