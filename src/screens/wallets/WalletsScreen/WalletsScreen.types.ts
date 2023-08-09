import {
	CompositeNavigationProp,
	ParamListBase
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { WalletsStackParams, Routes } from 'types';

export type WalletsScreenNavigationProp = CompositeNavigationProp<
	StackNavigationProp<WalletsStackParams, Routes.Wallets>,
	BottomTabNavigationProp<ParamListBase>
>;
