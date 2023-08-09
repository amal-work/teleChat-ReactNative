import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParams, Routes } from 'types';
import { RouteProp } from '@react-navigation/native';

export type AboutYouSocialMediaScreenRouteProp = RouteProp<
	AuthStackParams,
	Routes.AboutYouSocialMedia
>;

export type AboutYouSocialMediaScreenNavigationProp = StackNavigationProp<
	AuthStackParams,
	Routes.Authentication
>;
