import { StyleProp, ViewStyle } from 'react-native';

export interface DropdownItemProps<T> {
	children: React.ReactNode;
	data: T;
	last?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
	onPress: () => void;
	onClose?: () => void;
	onSelect?: (data: T) => void;
}

export interface BaseDropdownProps<TItem> {
	children:
		| React.ReactElement<DropdownItemProps<TItem>>
		| React.ReactElement<DropdownItemProps<TItem>>[];
	title: string;
	style?: StyleProp<ViewStyle>;
	initialSelected?: string;
}
