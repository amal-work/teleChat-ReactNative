import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParams, Routes } from 'types';

export type AuthenticationScreenNavigationProp = StackNavigationProp<
	AuthStackParams,
	Routes.Authentication
>;
