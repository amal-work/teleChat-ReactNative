import React from 'react';
import { SvgProps } from 'react-native-svg';

import { Dropdown } from './Dropdown';
import { BaseDropdownProps } from './Dropdown.types';
import { DropdownItem } from './DropdownItem';
import { WalletDropdownToggle } from './WalletDropdownToggle';
import { StyleProp, ViewStyle } from 'react-native';

export interface WalletData {
	icon: React.FC<SvgProps>;
	name: string;
	currency?: string;
	rate?: string;
}

export function WalletDropdown({
	children,
	style,
	...rest
}: BaseDropdownProps<WalletData>) {
	const firstChild = rest.initialSelected
		? React.Children.map(children, (child) => child).filter(
				(child) => child.props.data.currency === rest.initialSelected
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  )[0] || React.Children.map(children, (child) => child)[0]
		: React.Children.map(children, (child) => child)[0];

	return (
		<Dropdown<WalletData>
			{...rest}
			children={children}
			initialSelect={firstChild.props.data}
			toggleComponent={({ selected, onOpen }) => (
				<WalletDropdownToggle
					style={style}
					icon={(types) => selected?.icon ?? types.Usd}
					wallet={selected?.name ?? ''}
					currency={selected?.currency}
					rate={selected?.rate}
					onPress={onOpen}
				/>
			)}
		/>
	);
}

WalletDropdown.Item = DropdownItem;
