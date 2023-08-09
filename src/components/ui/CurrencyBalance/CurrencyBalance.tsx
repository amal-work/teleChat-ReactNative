import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import { useDimensions } from 'hooks';
import { CurrencyBalanceTab, Tabs } from '../Tabs';

import { TabProps } from 'types';

interface Props {
	children: React.ReactElement<TabProps>[];
	containerStyle: StyleProp<ViewStyle>;
}

export function CurrencyBalance({ containerStyle, children }: Props) {
	return (
		<View style={[styles.container, containerStyle]}>
			{children && <Tabs currencyBalanceTab>{children}</Tabs>}
		</View>
	);
}

const { isSmallDevice } = useDimensions();

const styles = StyleSheet.create({
	container: {
		marginTop: isSmallDevice ? 0 : 25
	}
});

CurrencyBalance.Tab = CurrencyBalanceTab;
