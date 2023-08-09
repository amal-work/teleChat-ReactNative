import React from 'react';
import {
	Text,
	View,
	TouchableOpacityProps,
	StyleProp,
	ViewStyle
} from 'react-native';

import { Colors, Typography } from 'environment';
import { ListRow } from './ListRow';

interface Props {
	containerStyle?: StyleProp<ViewStyle>;
	iconComponent: React.ReactElement;
	header: string;
	description: string;
	value: string;
	info: string;
	onPress: () => void;
}

export function ChatListRow({
	containerStyle,
	iconComponent,
	header,
	description,
	value,
	info,
	onPress
}: Props) {
	return (
		<ListRow
			containerStyle={containerStyle}
			iconComponent={<View>{iconComponent}</View>}
			header={header}
			description={description}
			value={value}
			valueStyle={{ ...Typography.body.medium }}
			onPress={onPress}
			infoComponent={
				info.length > 0 ? (
					<View
						style={{
							backgroundColor: Colors.blue[6],
							borderRadius: 8
						}}>
						<Text
							style={{
								...Typography.info,
								paddingVertical: 4,
								paddingHorizontal: info.length > 1 ? 6 : 8
							}}>
							{info}
						</Text>
					</View>
				) : undefined
			}
		/>
	);
}
