import React from 'react';
import { Text, View } from 'react-native';

import { Icon } from 'components/ui';
import { Colors } from 'environment';

import { ListRow } from './ListRow';
import styles from './ListRow.style';
import { IconProps, ListRowProps } from './ListRow.types';

interface Props extends IconProps, ListRowProps {
	info: string;
	value: string;
	positive?: boolean;
}

export function CurrencyListRow({
	icon,
	info,
	positive = false,
	...props
}: Props) {
	return (
		<ListRow
			{...props}
			iconComponent={<Icon type={icon} size={45} />}
			infoComponent={
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Icon
						type={(icons) => icons.ChevronRight}
						size={10}
						style={{
							transform: [{ scaleY: positive ? -1 : 1 }, { rotate: '-1.55' }],
							marginRight: 4,
							marginTop: 8
						}}
						color={positive ? Colors.blue[6] : Colors.red[10]}
					/>
					<Text
						style={[
							styles.info,
							{ color: positive ? Colors.blue[6] : Colors.red[10] }
						]}>
						{`${info}%`}
					</Text>
				</View>
			}
		/>
	);
}
