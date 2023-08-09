import React from 'react';
import { Text, TextInput, View } from 'react-native';

import { ActionSheet } from '../ActionSheet';

import { useDimensions } from 'hooks';

import styles from './FilterableDropdownMenu.styles';

interface Props {
	children: React.ReactElement | React.ReactElement[];
	title: string;
	open: boolean;
	filterValue: string;
	onFilterChange: (value: string) => void;
	onClose: () => void;
}

export function FilterableDropdownMenu({
	children,
	title,
	open,
	filterValue,
	onClose,
	onFilterChange
}: Props) {
	const { screenHeight } = useDimensions();
	return (
		<ActionSheet
			visible={open}
			onClose={onClose}
			containerStyle={{ height: screenHeight * 0.8 }}>
			<View style={styles.indicator} />
			<Text style={styles.title}>{title}</Text>

			<TextInput
				value={filterValue}
				onChangeText={onFilterChange}
				style={styles.search}
				placeholder='Search country'
			/>

			{children}
		</ActionSheet>
	);
}
