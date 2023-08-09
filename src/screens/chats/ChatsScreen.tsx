import React from 'react';

import { ChatListRow, Screen, Icon, SwipeRecognizer } from 'components/ui';
import { FlatList } from 'react-native';
import { ChatListData } from './ChatScreen.mocks';
import { Routes } from 'types';

export function ChatsScreen({ navigation: { navigate } }) {
	return (
		<Screen withoutPadding>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={ChatListData}
				keyExtractor={({ id }) => id}
				renderItem={({ item }) => (
					<SwipeRecognizer
						archiveAction={() => console.log('archived')}
						deleteAction={() => console.log('delete')}>
						<ChatListRow
							containerStyle={{ position: 'relative' }}
							iconComponent={
								<Icon type={(icons) => icons[item.icon]} size={40} />
							}
							header={item.name}
							description={item.lastMessage}
							value={item.lastMessageTime}
							info={item.messagesCounter}
							onPress={() =>
								navigate(Routes.Conversation, {
									id: item.id,
									name: item.name
								})
							}
						/>
					</SwipeRecognizer>
				)}
			/>
		</Screen>
	);
}
