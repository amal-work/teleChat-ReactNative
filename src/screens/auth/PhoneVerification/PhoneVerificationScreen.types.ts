import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParams, Routes } from 'types';

export type PhoneVerificationScreenNavigationProp = StackNavigationProp<
	AuthStackParams,
	Routes.PhoneVerification
>;

export type PhoneVerificationScreenRouteProp = RouteProp<
	AuthStackParams,
	Routes.PhoneVerification
>;
