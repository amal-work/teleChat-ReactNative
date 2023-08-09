import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { Header, ProfilePictureName, Input, Screen } from 'components/ui';
import { Colors } from 'environment';

export function AccountScreen() {
	const [name, setName] = useState('');
	const [bio, setBio] = useState('');

	const { goBack } = useNavigation();

	function handleChanges() {
		goBack();
		console.log('changes made');
	}

	return (
		<Screen
			headerComponent={
				<Header
					title='Account'
					rightComponent={
						<TouchableOpacity style={{ flex: 1 }} onPress={handleChanges}>
							<Text style={{ color: Colors.blue[6] }}>Done</Text>
						</TouchableOpacity>
					}
				/>
			}>
			<View
				style={{
					marginVertical: 30,
					alignItems: 'center'
				}}>
				<ProfilePictureName name='Test' hideName bigSize />
				<TouchableOpacity style={{ paddingVertical: 10 }}>
					<Text style={{ color: Colors.blue[6] }}>Change picture</Text>
				</TouchableOpacity>
			</View>
			<Input
				containerStyle={{ marginVertical: 30 }}
				label='Full name'
				value={name}
				onChangeText={(e) => setName(e)}
			/>
			<Input
				containerStyle={{ marginVertical: 30 }}
				label='Bio'
				value={bio}
				onChangeText={(e) => setBio(e)}
			/>
		</Screen>
	);
}
