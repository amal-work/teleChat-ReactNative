import React from 'react';
import { FilterableDropdown } from 'components/ui/Dropdown/FilterableDropdown';
import { PhoneCodeDropdownToggle } from './PhoneCodeDropdownToggle';
import { View, Image, Text } from 'react-native';

import { CountyDataList } from 'consts';

import styles from './PhoneCodeDropdown.styles';

interface CountryData {
	name: string;
	flag: string;
	phoneCode: string;
	code: string;
}

interface Props {
	onSelect: (country: CountryData) => void;
}

export function PhoneCodeDropdown({ onSelect }: Props) {
	const keyExtractor = (item: CountryData, index: number) =>
		`${item.name}${index}`;

	return (
		<FilterableDropdown<CountryData>
			title='Select Country'
			toggleComponent={PhoneCodeDropdownToggle}
			data={CountyDataList}
			keyExtractor={keyExtractor}
			filterField={'name'}
			renderItem={(item: CountryData) => (
				<FilterableDropdown.Item
					data={item}
					onPress={() => console.log('PRESSED', item)}
					onSelect={onSelect}>
					<View style={styles.itemWrapper}>
						<Image source={{ uri: item.flag }} style={styles.image} />
						<Text style={styles.country}>{item.name}</Text>
						<Text style={styles.code}>({item.phoneCode})</Text>
					</View>
				</FilterableDropdown.Item>
			)}
		/>
	);
}
