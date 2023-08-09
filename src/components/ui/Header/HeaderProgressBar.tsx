import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Colors } from 'environment';
import { Icon } from '../Icon';

import { BaseHeaderProps } from './BaseHeader.types';
import { BaseHeader } from './BaseHeader';

interface Props {
	from: number;
	to: number;
	baseProps: BaseHeaderProps;
}

export function HeaderProgressBar(props: BaseHeaderProps) {
	const { goBack } = useNavigation();

	return (
		<BaseHeader
			{...props}
			from={props.from}
			to={props.to}
			leftComponent={
				props.leftComponent ? (
					props.leftComponent
				) : (
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
