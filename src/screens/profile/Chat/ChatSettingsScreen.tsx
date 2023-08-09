import React from 'react';
import { View } from 'react-native';

import {
	Screen,
	Header,
	ListRow,
	NavigationListRow,
	Switcher
} from 'components/ui';
import { Colors } from 'environment';
import { Routes } from 'types';

export function ChatSettingsScreen({ navigation: { navigate } }) {
	return (
		<Screen headerComponent={<Header title='Chat' />} withoutPadding>
			<View style={{ marginVertical: 20, backgroundColor: Colors.white }}>
				<ListRow
					containerStyle={{ paddingHorizontal: 20 }}
					header='Enter to send'
					rightIconComponent={
						<Switcher onPress={() => console.log('enter to send activated')} />
					}
					onPress={() => {}}
				/>
				<NavigationListRow
					containerStyle={{ paddingHorizontal: 20 }}
					title='Wallpaper'
					onPress={() => navigate(Routes.WallpaperSettings)}
				/>
				<NavigationListRow
					containerStyle={{ paddingHorizontal: 20 }}
					title='Chat History'
					onPress={() => {}}
				/>
			</View>
			<View style={{ marginVertical: 20, backgroundColor: Colors.white }}>
				<NavigationListRow
					containerStyle={{ paddingHorizontal: 20 }}
					title='Archived Chat'
					onPress={() => {}}
				/>
				<NavigationListRow
					containerStyle={{ paddingHorizontal: 20 }}
					title='Delete all chats'
					warning
					onPress={() => {}}
				/>
				<NavigationListRow
					containerStyle={{ paddingHorizontal: 20 }}
					title='Clear all chats'
					warning
					onPress={() => {}}
				/>
			</View>
		</Screen>
	);
}
