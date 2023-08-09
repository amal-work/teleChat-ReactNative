// import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import { ProfilePictureName, SelectOption, Screen } from 'components/ui';
import { Routes } from 'types';

import styles from './ProfileScreen.style';
import { ProfileScreenNavigationProp } from './ProfileScreen.types';

interface Props {
	navigation: ProfileScreenNavigationProp;
}

export function ProfileScreen({ navigation: { navigate } }: Props) {
	// async function handleLogout() {
	// 	await AsyncStorage.clear();
	// 	client.clearStore();
	// 	localLogin(false);
	// }

	return (
		<Screen
			headerComponent={
				<View style={styles.headerContainer}>
					<Text style={styles.header}>Profile</Text>
				</View>
			}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={{ marginTop: 40, marginBottom: 10 }}>
					<ProfilePictureName name='Andrew Becks' phone='+3213213513' />
				</View>
				<SelectOption
					icon={(icons) => icons.Person}
					optionName='Account'
					onPress={() => navigate(Routes.Account)}
				/>
				<SelectOption
					icon={(icons) => icons.Message}
					optionName='Chat'
					onPress={() => navigate(Routes.ChatSettings)}
				/>
				<SelectOption
					icon={(icons) => icons.History}
					optionName='Transactions'
					onPress={() => navigate(Routes.Transactions)}
				/>
				<SelectOption
					icon={(icons) => icons.LockOpen}
					optionName='Security'
					onPress={() => navigate(Routes.Security)}
				/>
				<SelectOption
					icon={(icons) => icons.Share}
					optionName='Share with Friends'
					onPress={() => {}}
				/>
				<View style={styles.line} />
				<SelectOption
					icon={(icons) => icons.Info}
					optionName='Support'
					onPress={() => {}}
				/>
				<SelectOption
					icon={(icons) => icons.Logout}
					optionName='Logout'
					warning
				/>
			</ScrollView>
		</Screen>
	);
}
