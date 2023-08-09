import uuid from 'uuid/v4';
import { Icons } from 'environment';

enum TransactionType {
	Deposit = 'Deposit',
	Withdraw = 'Withdraw',
	Sent = 'Sent',
	Receive = 'Receive'
}

interface TransactionMocksData {
	id: string;
	icon: keyof typeof Icons;
	iconWithBackground: boolean;
	header: string;
	description: string;
	value: string;
	transactionType: TransactionType;
}

export const MockTransactions: TransactionMocksData[] = [
	{
		id: uuid(),
		icon: 'Bank',
		iconWithBackground: true,
		header: 'BTC Wallet',
		description: '12 Jan, 2020 12:34am',
		value: '12.12 BTC',
		transactionType: TransactionType.Withdraw
	},
	{
		id: uuid(),
		icon: 'Bitcoin',
		iconWithBackground: false,
		header: 'BTC Wallet',
		description: '12 Jan, 2020 12:34am',
		value: '12.12 BTC',
		transactionType: TransactionType.Deposit
	},
	{
		id: uuid(),
		icon: 'Bank',
		iconWithBackground: true,
		header: 'Kyle Walker',
		description: '12 Jan, 2020 12:34am',
		value: '12.12 BTC',
		transactionType: TransactionType.Sent
	},
	{
		id: uuid(),
		icon: 'Ethereum',
		iconWithBackground: false,
		header: 'ETH Wallet',
		description: '12 Jan, 2020 12:34am',
		value: '12.12 BTC',
		transactionType: TransactionType.Receive
	},
	{
		id: uuid(),
		icon: 'Bank',
		iconWithBackground: true,
		header: 'BTC Wallet',
		description: '12 Jan, 2020 12:34am',
		value: '12.12 BTC',
		transactionType: TransactionType.Deposit
	},
	{
		id: uuid(),
		icon: 'Ethereum',
		iconWithBackground: false,
		header: 'ETH Wallet',
		description: '12 Jan, 2020 12:34am',
		value: '12.12 BTC',
		transactionType: TransactionType.Receive
	},
	{
		id: uuid(),
		icon: 'Bank',
		iconWithBackground: true,
		header: 'BTC Wallet',
		description: '12 Jan, 2020 12:34am',
		value: '12.12 BTC',
		transactionType: TransactionType.Deposit
	}
];
