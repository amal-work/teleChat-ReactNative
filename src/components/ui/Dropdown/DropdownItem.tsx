import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Icon } from '../Icon';
import { Colors } from 'environment';

import { DropdownItemProps } from './Dropdown.types';
import styles from './DropdownItem.style';

export function DropdownItem<T>({
	children,
	data,
	last,
	containerStyle,
	onClose,
	onPress,
	onSelect
}: DropdownItemProps<T>) {
	function handlePress() {
		onPress();
		onSelect && onSelect(data);
		onClose && onClose();
	}

	return (
		<TouchableOpacity
			style={[styles.container, containerStyle, !last && styles.border]}
			onPress={handlePress}>
			<View style={styles.content}>{children}</View>
			<Icon
				type={(icon) => icon.ChevronRight}
				color={Colors.gray[4]}
				size={16}
			/>
		</TouchableOpacity>
	);
}
