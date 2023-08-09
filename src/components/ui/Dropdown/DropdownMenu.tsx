import React from 'react';
import { Text, View } from 'react-native';

import { ActionSheet } from '../ActionSheet';

import styles from './DropdownMenu.style';

interface Props {
	children: React.ReactElement | React.ReactElement[];
	title: string;
	open: boolean;
	onClose: () => void;
}

export function DropdownMenu({
	children,
	title,
	open,
	onClose,
	...rest
}: Props) {
	return (
		<ActionSheet visible={open} onClose={onClose}>
			<View style={styles.indicator} />
			<Text style={styles.title}>{title}</Text>
			{children}
		</ActionSheet>
	);
}
