import { SocialType, SocialMediaData } from './components';

export enum Routes {
	AboutYou = 'AboutYouScreen',
	AboutYouSocialMedia = 'AboutYouSocialMediaScreen',
	Authentication = 'AuthenticationScreen',
	ForgotPassword = 'ForgotPasswordScreen',
	PhoneVerification = 'PhoneVerificationScreen',
	Chats = 'ChatsScreen',
	Conversation = 'ConversationScreen',
	Wallets = 'WalletsScreen',
	Profile = 'ProfileScreen',
	SenderReceiverPeople = 'SenderReceiverPeopleScreen',
	ConfirmTransaction = 'ConfirmTransactionScreen',
	ReceiveAmount = 'ReceiveAmountScreen',
	Account = 'AccountScreen',
	Transactions = 'TransactionsScreen',
	Security = 'SecurityScreen',
	ChangePin = 'ChangePinScreen',
	ChatSettings = 'ChatSettingsScreen',
	WallpaperSettings = 'WallpaperSettingsScreen',
	LaunchCamera = 'LaunchCamera'
}

export enum Tabs {
	Chats = 'Chats',
	Wallets = 'Wallets',
	Profile = 'Profile'
}

type StackParamsBase = Record<string, object | undefined>;

export type TabsStackParams = {
	[Tabs.Chats]: undefined;
	[Tabs.Wallets]: undefined;
	[Tabs.Profile]: undefined;
};

export interface AuthStackParams extends StackParamsBase {
	[Routes.Authentication]: undefined;
	[Routes.PhoneVerification]: {
		phone: string;
		socialMedia?: string;
	};
	[Routes.AboutYou]: undefined;
	[Routes.AboutYouSocialMedia]: { type: SocialType; data: SocialMediaData };
	[Routes.ForgotPassword]: undefined;
}

export type ChatsStackParams = {
	[Routes.Chats]: undefined;
	[Routes.Conversation]: { id: string; name: string };
	[Routes.LaunchCamera]: undefined;
};

export type WalletsStackParams = {
	[Routes.Wallets]: undefined;
	[Routes.SenderReceiverPeople]: undefined;
};

export type ProfileStackParams = {
	[Routes.Profile]: undefined;
	[Routes.Account]: undefined;
	[Routes.ChatSettings]: undefined;
	[Routes.Transactions]: undefined;
	[Routes.Security]: undefined;
	[Routes.ChangePin]: undefined;
	[Routes.WallpaperSettings]: undefined;
};

export type RequestTransactionStackParams = {
	[Routes.SenderReceiverPeople]: undefined;
};

export type ReceiveTransactionStackParams = {
	[Routes.ReceiveAmount]: undefined;
};

export type ConfirmTransactionStackParams = {
	[Routes.ConfirmTransaction]: {
		wallet: string;
		transactionTypeMessage: string;
		amount?: string;
		person?: string;
	};
};
