import { Icons } from 'environment';
import uuid from 'uuid/v4';

interface CurrencyWalletBalanceDataProps {
	id: string;
	wallet: string;
	currencySymbol: string;
	amount: string;
}

export const CurrencyWalletBalanceData: CurrencyWalletBalanceDataProps[] = [
	{
		id: uuid(),
		wallet: 'NGN',
		currencySymbol: '₦',
		amount: '320,000'
	},
	{
		id: uuid(),
		wallet: 'USD',
		currencySymbol: '$',
		amount: '220,000'
	},
	{
		id: uuid(),
		wallet: 'BTC',
		currencySymbol: '₿',
		amount: '80,000'
	},
	{
		id: uuid(),
		wallet: 'ETH',
		currencySymbol: 'Ð',
		amount: '40,000'
	}
];

interface WalletDataProps {
	id: string;
	icon: keyof typeof Icons;
	header: string;
	description: string;
	value: string;
}

export const WalletData: WalletDataProps[] = [
	{
		id: uuid(),
		icon: 'Usd',
		header: 'USD wallet',
		description: '$1.00',
		value: '$45.00'
	},
	{
		id: uuid(),
		icon: 'Bitcoin',
		header: 'BTC wallet',
		description: '$8990.15',
		value: '$9821.43'
	},
	{
		id: uuid(),
		icon: 'Ethereum',
		header: 'ETH wallet',
		description: '$503.82',
		value: '$4553.00'
	},
	{
		id: uuid(),
		icon: 'Naira',
		header: 'NGN wallet',
		description: '$0.028',
		value: '$325.00'
	}
];
