import React from 'react';
import { StyleProp, View, ViewStyle, Image } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Icons, Colors } from 'environment';
import { RequireOnlyOne } from 'types';
import { Spring } from '../Spring';

interface Picture {
	type: (icons: typeof Icons) => React.FC<SvgProps>;
	src: string;
}

interface BaseProps {
	color?: string;
	size?: number;
	style?: StyleProp<ViewStyle>;
	onPress?: () => void;
}

type Props = RequireOnlyOne<Picture> & BaseProps;

export function Icon({
	type,
	src,
	color = Colors.blue[6],
	size = 20,
	style,
	onPress
}: Props) {
	if (!type) {
		return (
			<View style={style}>
				<Image
					style={{
						borderRadius: size,
						height: size,
						width: size
					}}
					source={{ uri: src }}
				/>
			</View>
		);
	} else {
		const Component = type(Icons);

		if (onPress) {
			return (
				<Spring.TouchableOpacity
					activeOpacity={0.5}
					style={style}
					onPress={onPress}>
					<Component color={color} height={size} width={size} />
				</Spring.TouchableOpacity>
			);
		}

		return (
			<View style={style}>
				<Component color={color} height={size} width={size} />
			</View>
		);
	}
}
