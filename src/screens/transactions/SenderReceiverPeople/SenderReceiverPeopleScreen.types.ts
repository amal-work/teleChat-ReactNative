import { StackNavigationProp } from '@react-navigation/stack';
import { Routes, ConfirmTransactionStackParams } from 'types';

export type SenderReceiverPeopleScreenNavigationProp = StackNavigationProp<
	ConfirmTransactionStackParams,
	Routes.ConfirmTransaction
>;
