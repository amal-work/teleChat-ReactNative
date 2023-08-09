import { StackNavigationProp } from '@react-navigation/stack';
import { Routes, WalletsStackParams } from 'types';

export type ReceiveAmountScreenNavigationProp = StackNavigationProp<
	WalletsStackParams,
	Routes.CurrencyWallet
>;
