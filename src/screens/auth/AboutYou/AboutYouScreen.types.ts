import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParams, Routes } from 'types';

export type AboutYouScreenNavigationProp = StackNavigationProp<
	AuthStackParams,
	Routes.PhoneVerification
>;
