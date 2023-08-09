import React, { useState } from 'react';

import { Checkbox, Icon } from 'components/ui';

import { ListRow } from './ListRow';
import { IconProps, ListRowProps } from './ListRow.types';

type CreditCardListRowProps = Omit<
	ListRowProps,
	'value' | 'valueStyle' | 'info'
>;

interface Props extends IconProps, CreditCardListRowProps {
	onPress: () => void;
}

export function CreditCardListRow({ icon, onPress, ...props }: Props) {
	const [checked, setChecked] = useState(false);

	function handlePress() {
		setChecked(state => !state);
	}

	return (
		<ListRow
			{...props}
			iconComponent={<Icon type={icon} size={45} />}
			rightIconComponent={<Checkbox value={checked} />}
			onPress={handlePress}
		/>
	);
}
