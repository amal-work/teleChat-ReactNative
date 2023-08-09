import React from 'react';
import { FlatList } from 'react-native';

import { Header, TransactionListRow, Screen } from 'components/ui';

import { SenderReceiverPeopleScreenNavigationProp } from './SenderReceiverPeopleScreen.types';
import { PeopleData } from './SenderReceiverPeopleScreen.mocks';

interface Props {
	navigation: SenderReceiverPeopleScreenNavigationProp;
}

export function SenderReceiverPeopleScreen({
	navigation: { navigate }
}: Props) {
	return (
		<Screen headerComponent={<Header title='Select Sender' />}>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={PeopleData}
				keyExtractor={({ id }) => id}
				renderItem={({ item }) => (
					<TransactionListRow
						icon={(icons) => icons[item.icon]}
						header={item.name}
						description={item.nickname}
						rightIcon={(icons) => icons.ChevronRight}
						onTransactionConfirm={
							() => {}
							// navigate(Routes.ConfirmTransaction, {
							// 	wallet: 'USD',
							// 	transactionTypeMessage: 'Request sent',
							// 	person: '"Diego Simeone ($simeone)"',
							// 	amount: '2222,22'
							// })
						}
					/>
				)}
			/>
		</Screen>
	);
}
