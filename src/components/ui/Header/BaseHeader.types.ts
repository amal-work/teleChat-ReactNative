import { TabProps } from 'types';
import { StyleProp, ViewStyle } from 'react-native';
import { Icons } from 'environment';
import { SvgProps } from 'react-native-svg';

export interface BaseHeaderProps {
	leftComponent?: React.ReactElement;
	rightComponent?: React.ReactElement;
	name?: string | null;
	profilePicture?: string;
	children?: React.ReactElement<TabProps>[];
	search?: React.ReactElement;
	title?: string;
	description?: string;
	leftAlign?: boolean;
	labelContainerStyle?: StyleProp<ViewStyle>;
	from?: number;
	to?: number;
	userPhoto?: string;
	icon?: (icons: typeof Icons) => React.FC<SvgProps>;
	iconSize?: number;
	transparent?: boolean;
	whiteContent?: boolean;
	time?: boolean;
}
