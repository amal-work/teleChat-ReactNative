import React from 'react';
import { Text, View, StyleProp, ViewStyle } from 'react-native';

import styles from './Amount.style';

interface Props {
	wallet?: string;
	currency: string;
	amount: string;
	remainAmount?: string;
	whiteContent?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
}

export function Amount({
	wallet,
	currency,
	amount,
	remainAmount,
	whiteContent,
	containerStyle
}: Props) {
	return (
		<View style={[{ alignItems: 'center' }, containerStyle]}>
			{!!wallet && (
				<Text style={styles(whiteContent).balance}>{wallet} BALANCE</Text>
			)}
			<View style={{ flexDirection: 'row' }}>
				<Text style={styles(whiteContent).smallText}>{currency}</Text>
				<Text style={styles(whiteContent).bigText}>
					{amount.split('.')[0]}
					{amount.split('.').length === 2 && '.'}
				</Text>
				<Text style={styles(whiteContent).smallText}>
					{amount.split('.')[1]}
				</Text>
			</View>
			{!!remainAmount && (
				<View style={{ flexDirection: 'row' }}>
					<Text style={styles(whiteContent).remainAmount}>
						Balance after sending:{' '}
					</Text>
					<Text style={styles(whiteContent).remainAmountSemiBold}>
						{currency}
						{remainAmount}
					</Text>
				</View>
			)}
		</View>
	);
}
