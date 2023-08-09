import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleProp,
	ViewStyle
} from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Icons } from 'environment';

import { Icon } from '../Icon';
import styles from './WalletDropdownToggle.style';

interface Props {
	icon: (icons: typeof Icons) => React.FC<SvgProps>;
	wallet: string;
	currency?: string;
	rate?: string;
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
}

export function WalletDropdownToggle({
	icon,
	wallet,
	currency,
	rate,
	onPress,
	style
}: Props) {
	return (
		<TouchableOpacity
			style={[styles.container, style ? style : {}]}
			onPress={onPress}>
			<View style={{ flexDirection: 'row' }}>
				{icon && (
					<View style={{ marginLeft: 10 }}>
						<Icon type={icon} size={24} />
					</View>
				)}
				<Text style={styles.title}>{wallet}</Text>
				<Text style={styles.currency}>{currency}</Text>
			</View>
			<View style={{ flexDirection: 'row' }}>
				<Text style={styles.rate}>{rate}</Text>
				<View style={{ marginRight: 10 }}>
					<Icon type={(icons) => icons.ChevronDown} size={16} />
				</View>
			</View>
		</TouchableOpacity>
	);
}
