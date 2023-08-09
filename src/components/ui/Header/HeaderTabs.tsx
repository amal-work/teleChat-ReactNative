import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Colors } from 'environment';
import { Icon } from '../Icon';
import { Tab } from '../Tabs';

import { BaseHeaderProps } from './BaseHeader.types';
import { BaseHeader } from './BaseHeader';
import { useNavigation } from '@react-navigation/native';

export function HeaderTabs(props: BaseHeaderProps) {
	const { goBack } = useNavigation();

	return (
		<BaseHeader
			{...props}
			leftComponent={
				props.noBackButton ? undefined : (
					<TouchableOpacity
						activeOpacity={0.5}
						style={{ flex: 1 }}
						onPress={() => goBack()}
					>
						<Icon
							type={(icons) => icons.ArrowLeft}
							size={24}
							color={props.whiteContent ? Colors.white : Colors.gray[4]}
						/>
					</TouchableOpacity>
				)
			}
		/>
	);
}

HeaderTabs.Tab = Tab;
