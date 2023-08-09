import React from 'react';
import { FlatList } from 'react-native';

import { Header, Screen, TransactionListRow } from 'components/ui';
import { MockTransactions } from './TransactionsScreen.mocks';

export function TransactionsScreen() {
	return (
		<Screen headerComponent={<Header title='Transactions' />} withoutPadding>
			<FlatList
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 20 }}
				data={MockTransactions}
				keyExtractor={({ id }) => id}
				renderItem={({ item }) => (
					<TransactionListRow
						icon={(icons) => icons[item.icon]}
						header={item.header}
						iconBackground={item.iconWithBackground}
						description={item.description}
						value={item.value}
						info={item.transactionType}
						transaction={(types) => types[item.transactionType]}
					/>
				)}
			/>
		</Screen>
	);
}
