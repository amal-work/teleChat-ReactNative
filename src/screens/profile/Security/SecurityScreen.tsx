import React from 'react';
import { View } from 'react-native';

import {
	Screen,
	Header,
	ListRow,
	Switcher,
	NavigationListRow
} from 'components/ui';
import { Colors } from 'environment';
import { Routes } from 'types';

import { SecurityNavigationProp } from './Security.types';

interface Props {
	navigation: SecurityNavigationProp;
}

export function SecurityScreen({ navigation: { navigate } }: Props) {
	return (
		<Screen headerComponent={<Header title='Security' />} withoutPadding>
			<View style={{ marginVertical: 20, backgroundColor: Colors.white }}>
				<ListRow
					containerStyle={{ paddingHorizontal: 20 }}
					header='Enable Biometrics'
					rightIconComponent={
						<Switcher onPress={() => console.log('fingerprint on')} />
					}
				/>
				<NavigationListRow
					containerStyle={{ paddingHorizontal: 20 }}
					title='Change Pin'
					onPress={() => navigate(Routes.ChangePin)}
				/>
			</View>
		</Screen>
	);
}
