import React from 'react';

import { Dropdown } from './Dropdown';
import { DropdownItem } from './DropdownItem';
import { InputDropdownToggle } from './InputDropdownToggle';
import { BaseDropdownProps } from './Dropdown.types';

interface Props extends BaseDropdownProps<string> {
	label: string;
}

export function InputDropdown({ label, ...rest }: Props) {
	return (
		<Dropdown<string>
			{...rest}
			toggleComponent={({ selected = '', onOpen }) => (
				<InputDropdownToggle
					label={label}
					selectedItem={selected}
					onPress={onOpen}
				/>
			)}
		/>
	);
}

InputDropdown.Item = DropdownItem;
