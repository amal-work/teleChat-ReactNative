import { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import { AlertType } from 'consts';

export interface Alert {
	uuid: string;
	type: AlertType;
	message: string;
	title?: string;
	timeout?: number;
}

export interface TabProps {
	children: React.ReactElement;
	label: string;
	active?: boolean;
	last?: boolean;
	onMeasure?: (event: LayoutChangeEvent) => void;
	onTabChange?: () => void;
	containerStyle?: StyleProp<ViewStyle>;
}

interface FacebookPermissionsData {
	accessToken: string;
	declinedPermissions: Array<string>;
	grantedPermissions: Array<string>;
	isCancelled: boolean;
}

interface FacebookPictureData {
	height: number;
	url: string;
	width: number;
}

interface FacebookUserData {
	id: string;
	birthday: string;
	email: string;
	first_name: string;
	last_name: string;
	picture: { data: FacebookPictureData };
}

export type FacebookProps = FacebookPermissionsData &
	FacebookPictureData &
	FacebookUserData;

export enum SocialType {
	Google = 'Google',
	Facebook = 'Facebook',
	Apple = 'Apple'
}

export interface SocialMediaData {
	token: string;
	profilePicture: string;
	firstName: string;
	lastName: string;
	email: string;
	birthday?: string;
	phoneNumber?: string;
}
