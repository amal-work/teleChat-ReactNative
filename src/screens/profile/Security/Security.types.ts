import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParams, Routes } from 'types';

export type SecurityNavigationProp = StackNavigationProp<
	ProfileStackParams,
	Routes.ChangePin
>;
