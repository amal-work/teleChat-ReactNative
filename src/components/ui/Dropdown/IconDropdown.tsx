import React from 'react';
import { SvgProps } from 'react-native-svg';

import { Icons } from 'environment';

import { Icon } from '..';
import { Dropdown } from './Dropdown';
import { DropdownItem } from './DropdownItem';
import { BaseDropdownProps } from './Dropdown.types';

interface Props<TItem> extends BaseDropdownProps<TItem> {
	icon: (icons: typeof Icons) => React.FC<SvgProps>;
	iconSize: number;
}

export function IconDropdown<TItem>({ icon, iconSize, ...rest }: Props<TItem>) {
	return (
		<Dropdown
			{...rest}
			toggleComponent={({ onOpen }) => (
				<Icon type={icon} onPress={onOpen} size={iconSize} />
			)}
		/>
	);
}

IconDropdown.Item = DropdownItem;
