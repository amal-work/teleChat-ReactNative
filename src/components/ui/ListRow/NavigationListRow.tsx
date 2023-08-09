import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { Colors } from 'environment';
import { ListRow } from './ListRow';
import { Icon } from '../Icon';

interface Props {
	title: string;
	warning?: boolean;
	hideRightIcon?: boolean;
	onPress: () => void;
	containerStyle?: StyleProp<ViewStyle>;
}

export function NavigationListRow({
	title,
	warning,
	hideRightIcon = false,
	onPress,
	containerStyle
}: Props) {
	return (
		<ListRow
			containerStyle={containerStyle}
			header={title}
			headerTextStyle={warning && { color: Colors.red[10] }}
			rightIconComponent={
				!hideRightIcon ? (
					<Icon
						type={(icon) => icon.ChevronRight}
						color={Colors.gray[4]}
						size={16}
					/>
				) : undefined
			}
			onPress={onPress}
		/>
	);
}
