import React from 'react';

import { Icon } from 'components/ui';

import { ListRow } from './ListRow';
import { IconProps, ListRowProps } from './ListRow.types';
import { Colors } from 'environment';

type Props = IconProps & ListRowProps;

export function WalletListRow({ icon, rightIcon, iconSize, ...props }: Props) {
	return (
		<ListRow
			{...props}
			iconComponent={<Icon type={icon} size={!!iconSize ? iconSize : 45} />}
			rightIconComponent={
				rightIcon && <Icon type={rightIcon} size={15} color={Colors.gray[4]} />
			}
		/>
	);
}
