import React from 'react';
import { View } from 'react-native';

import { Screen, Header, NavigationListRow } from 'components/ui';
import { Colors } from 'environment';

export function WallpaperSettingsScreen() {
	return (
		<Screen headerComponent={<Header title='Wallpaper' />} withoutPadding>
			<View style={{ marginVertical: 20, backgroundColor: Colors.white }}>
				<NavigationListRow
					containerStyle={{ paddingHorizontal: 20 }}
					title='Colored Wallpaper'
					onPress={() => {}}
				/>
				<NavigationListRow
					containerStyle={{ paddingHorizontal: 20 }}
					title='Photo'
					onPress={() => {}}
				/>
			</View>
			<View style={{ marginVertical: 20, backgroundColor: Colors.white }}>
				<NavigationListRow
					containerStyle={{ paddingHorizontal: 20 }}
					title='Reset Wallpaper'
					warning
					onPress={() => {}}
				/>
			</View>
		</Screen>
	);
}
