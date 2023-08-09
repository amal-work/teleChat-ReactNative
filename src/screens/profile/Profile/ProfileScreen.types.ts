import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParams, Routes } from 'types';

type AccountNavigationProp = StackNavigationProp<
	ProfileStackParams,
	Routes.Account
>;

type ChatNavigationProp = StackNavigationProp<
	ProfileStackParams,
	Routes.ChatSettings
>;

type TransactionsNavigationProp = StackNavigationProp<
	ProfileStackParams,
	Routes.Transactions
>;

type SecurityNavigationProp = StackNavigationProp<
	ProfileStackParams,
	Routes.Security
>;

export type ProfileScreenNavigationProp = AccountNavigationProp &
	ChatNavigationProp &
	TransactionsNavigationProp &
	SecurityNavigationProp;
