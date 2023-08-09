import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { PrimaryButton } from '../Button';
import { Dropdown } from './Dropdown';
import { DropdownItem } from './DropdownItem';
import { BaseDropdownProps } from './Dropdown.types';

interface Props<TItem> extends BaseDropdownProps<TItem> {
	label: string;
	style?: StyleProp<ViewStyle>;
}

export function ButtonDropdown<TItem = string>({
	label,
	style,
	...rest
}: Props<TItem>) {
	return (
		<Dropdown
			{...rest}
			toggleComponent={({ onOpen }) => (
				<PrimaryButton title={label} containerStyle={style} onPress={onOpen} />
			)}
		/>
	);
}

ButtonDropdown.Item = DropdownItem;
