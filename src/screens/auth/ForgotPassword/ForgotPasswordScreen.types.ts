import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParams, Routes } from 'types';

export type ForgotPasswordScreenNavigationProp = StackNavigationProp<
	AuthStackParams,
	Routes.ForgotPassword
>;
