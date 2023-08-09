import React, { useState } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';

import {
	Screen,
	Header,
	ConversationInput,
	Icon,
	Message,
	KeyboardDismissal
} from 'components/ui';
import { Icons } from 'environment';
import { MessageType } from 'consts';
import { Routes } from 'types';

export function ConversationScreen({ navigation: { navigate } }) {
	const [text, setText] = useState('');

	return (
		<Screen
			headerComponent={
				<Header
					leftAlign
					icon={(icons) => icons.Person}
					title='ChatBackground'
					description='Last seen 20:14'
					rightComponent={
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Icon
								type={(icons) => icons.PhoneCall}
								size={17}
								style={{ marginRight: 20 }}
								onPress={() => {}}
							/>
							<Icon
								type={(icons) => icons.VideoCall}
								size={25}
								onPress={() => {}}
							/>
						</View>
					}
				/>
			}
			background={<Icons.ChatBackground />}
			footerComponent={
				<KeyboardAvoidingView behavior='padding'>
					<ConversationInput
						text={text}
						onChangeText={(txt) => setText(txt)}
						navigateToCamera={() => navigate(Routes.LaunchCamera)}
					/>
				</KeyboardAvoidingView>
			}>
			<KeyboardDismissal>
				<Message
					message='Test 123 asdasdasasdasdasdasdasdasdasdasdsadasdasdasdasdasdd'
					messageType={MessageType.SENT}
				/>
				<Message
					message='Test 123 asdasdasasdasdasdasdasdasdasdasdsadasdasdasdasdasdd'
					messageType={MessageType.SENT}
				/>
				<Message
					message='Test 123 asdasdasd'
					messageType={MessageType.RECEIVED}
				/>
			</KeyboardDismissal>
		</Screen>
	);
}
