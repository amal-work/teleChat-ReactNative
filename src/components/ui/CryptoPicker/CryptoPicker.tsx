import React from 'react';
import { ScrollView } from 'react-native';

interface Props {
	selectedCrypto: string;
	handleSelect: (item: string) => void;
	children: React.ReactElement[];
}

export function CryptoPicker({
	selectedCrypto,
	handleSelect,
	children
}: Props) {
	const enhancedChildren = React.Children.map(children, (child, index) =>
		React.cloneElement(child, {
			selectedCrypto,
			onSelect: handleSelect,
			last: index === React.Children.count(children) - 1
		})
	);

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			style={{ height: 120 }}
			contentContainerStyle={{ alignItems: 'center' }}>
			{enhancedChildren}
		</ScrollView>
	);
}
