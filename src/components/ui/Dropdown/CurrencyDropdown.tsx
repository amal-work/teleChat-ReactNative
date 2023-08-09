import React from 'react';

import { Dropdown } from './Dropdown';
import { DropdownItem } from './DropdownItem';

import { BaseDropdownProps } from './Dropdown.types';
import { Icons } from 'environment/theme';
import { CurrencyDropdownToggle } from './CurrencyDropdownToggle';

export interface CurrencyData {
	name: string;
	abbreviation: string;
	icon: keyof typeof Icons;
}

interface Props<T> extends BaseDropdownProps<T> {
	initialSelect: T;
}

export function CurrencyDropdown({ children, ...rest }: Props<CurrencyData>) {
	return (
		<Dropdown<CurrencyData>
			{...rest}
			children={children}
			toggleComponent={({ selected, onOpen }) => (
				<CurrencyDropdownToggle onPress={onOpen} currency={selected!} />
			)}
		/>
	);
}

CurrencyDropdown.Item = DropdownItem;
