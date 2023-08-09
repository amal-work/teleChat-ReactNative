import { SvgProps } from 'react-native-svg';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { Icons } from 'environment';

export interface IconProps {
	icon: (icons: typeof Icons) => React.FC<SvgProps>;
	iconSize?: number;
	iconBackground?: boolean;
	rightIcon?: (icons: typeof Icons) => React.FC<SvgProps>;
}

export interface ListRowProps {
	header: string;
	description?: string;
	value?: string;
	info?: string;
	disabled?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
	headerTextStyle?: StyleProp<TextStyle>;
	valueStyle?: StyleProp<TextStyle>;
	onPress?: () => void;
}
