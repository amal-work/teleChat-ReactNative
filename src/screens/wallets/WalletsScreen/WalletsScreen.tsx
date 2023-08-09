import React, { useState } from 'react';
import { View, FlatList } from 'react-native';

import { TransactionModal, QrCodeModal } from 'components/features';
import {
	PrimaryButton,
	GhostButton,
	Amount,
	CurrencyBalance,
	WalletListRow,
	Icon,
	HeaderProfile,
	Screen,
	ActionSheet
} from 'components/ui';
// import { useUserQuery } from 'hooks';
import { Routes } from 'types';

import { WalletsScreenNavigationProp } from './WalletsScreen.types';
import { WalletData, CurrencyWalletBalanceData } from './WalletScreen.mocks';

interface Props {
	navigation: WalletsScreenNavigationProp;
}

export function WalletsScreen({ navigation: { navigate } }: Props) {
	// const { data } = useUserQuery();
	const [modalVisibility, setModalVisibility] = useState(false);
	const [qrCodeModalVisible, setQrCodeModalVisibility] = useState(false);
	const [transactionType, setTransactionType] = useState('');

	function onButtonPress(transaction: string) {
		setTransactionType(transaction);
		setModalVisibility(true);
	}

	return (
		<Screen
			headerComponent={
				<HeaderProfile
					// name={data?.currentUser.firstName}
					// profilePicture={data?.currentUser.profilePicture}
					rightComponent={
						<Icon
							type={(icons) => icons.QRcode}
							onPress={() => setQrCodeModalVisibility(true)}
						/>
					}
					transparent
				/>
			}
			withoutPadding>
			<CurrencyBalance containerStyle={{ paddingHorizontal: 20 }}>
				{CurrencyWalletBalanceData.map((item) => (
					<CurrencyBalance.Tab key={item.id} label={item.wallet}>
						<Amount
							wallet={item.wallet}
							currency={item.currencySymbol}
							amount={item.amount}
						/>
					</CurrencyBalance.Tab>
				))}
			</CurrencyBalance>
			<FlatList
				showsVerticalScrollIndicator={false}
				style={{ paddingHorizontal: 20 }}
				data={WalletData}
				keyExtractor={({ id }) => id}
				ListHeaderComponent={
					<View
						style={{
							flexDirection: 'row',
							paddingVertical: 10,
							marginBottom: 5
						}}>
						<PrimaryButton
							containerStyle={{ flex: 1, paddingVertical: 12 }}
							icon={(icons) => icons.Deposit}
							title='Send'
							onPress={() => onButtonPress('Send')}
						/>
						<View style={{ width: 15 }} />
						<GhostButton
							containerStyle={{ flex: 1, paddingVertical: 12 }}
							icon={(icons) => icons.Withdraw}
							title='Request'
							onPress={() => onButtonPress('Request')}
						/>
					</View>
				}
				renderItem={({ item }) => (
					<WalletListRow
						icon={(icons) => icons[item.icon]}
						header={item.header}
						description={item.description}
						value={item.value}
					/>
				)}
			/>
			<ActionSheet
				visible={modalVisibility}
				onClose={() => setModalVisibility(false)}>
				<TransactionModal
					transactionType={transactionType}
					handleOnCloseModal={() => setModalVisibility(false)}
					navigate={() => navigate(Routes.SenderReceiverPeople)}
				/>
			</ActionSheet>
			<QrCodeModal
				modalVisibility={qrCodeModalVisible}
				handleOnCloseModal={() => setQrCodeModalVisibility(false)}
			/>
		</Screen>
	);
}
