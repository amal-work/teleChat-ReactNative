import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Colors } from 'environment';
import { useAuthContext, useHideRouteTabs } from 'hooks';
import {
	ChatsScreen,
	WalletsScreen,
	ProfileScreen,
	SenderReceiverPeopleScreen,
	ReceiveAmountScreen,
	TransactionsScreen,
	AccountScreen,
	SecurityScreen,
	ChangePinScreen,
	ChatSettingsScreen,
	WallpaperSettingsScreen,
	ConversationScreen,
	AuthenticationScreen,
	AboutYouSocialMediaScreen,
	PhoneVerification,
	AboutYouScreen,
	ForgotPasswordScreen
} from 'screens';
import {
	ChatsStackParams,
	WalletsStackParams,
	ProfileStackParams,
	Routes,
	Tabs,
	RequestTransactionStackParams,
	ReceiveTransactionStackParams,
	AuthStackParams
} from 'types';
import { Icon } from 'components/ui';
import { LaunchCamera } from 'components/features';
import { isMountedRef } from './RootNavigation';
import { SafeAreaView } from 'react-native';

const AuthStack = createStackNavigator<AuthStackParams>();

const ChatsStack = createStackNavigator<ChatsStackParams>();

function Chats() {
	useHideRouteTabs();

	return (
		<ChatsStack.Navigator
			screenOptions={{
				headerShown: false,
				cardStyle: { backgroundColor: Colors.background }
			}}>
			<ChatsStack.Screen name={Routes.Chats} component={ChatsScreen} />
			<ChatsStack.Screen
				name={Routes.Conversation}
				component={ConversationScreen}
			/>
			<ChatsStack.Screen name={Routes.LaunchCamera} component={LaunchCamera} />
		</ChatsStack.Navigator>
	);
}

const WalletsStack = createStackNavigator<WalletsStackParams>();

function Wallets() {
	useHideRouteTabs();

	return (
		<WalletsStack.Navigator
			screenOptions={{
				headerShown: false,
				cardStyle: { backgroundColor: Colors.background }
			}}>
			<WalletsStack.Screen name={Routes.Wallets} component={WalletsScreen} />
			<WalletsStack.Screen
				name={Routes.SenderReceiverPeople}
				component={SenderReceiverPeopleScreen}
			/>
		</WalletsStack.Navigator>
	);
}

const ProfileStack = createStackNavigator<ProfileStackParams>();

function Profile() {
	// useHideRouteTabs();

	return (
		<ProfileStack.Navigator
			screenOptions={{
				headerShown: false,
				cardStyle: { backgroundColor: Colors.background }
			}}>
			<ProfileStack.Screen name={Routes.Profile} component={ProfileScreen} />
			<ProfileStack.Screen name={Routes.Account} component={AccountScreen} />
			<ProfileStack.Screen
				name={Routes.ChatSettings}
				component={ChatSettingsScreen}
			/>
			<ProfileStack.Screen
				name={Routes.WallpaperSettings}
				component={WallpaperSettingsScreen}
			/>
			<ProfileStack.Screen
				name={Routes.Transactions}
				component={TransactionsScreen}
			/>
			<ProfileStack.Screen name={Routes.Security} component={SecurityScreen} />
			<ProfileStack.Screen
				name={Routes.ChangePin}
				component={ChangePinScreen}
			/>
		</ProfileStack.Navigator>
	);
}

const RequestTransactionsStack = createStackNavigator<
	RequestTransactionStackParams
>();

function RequestTransaction() {
	return (
		<RequestTransactionsStack.Navigator
			screenOptions={{
				headerShown: false,
				cardStyle: { backgroundColor: Colors.background }
			}}>
			<RequestTransactionsStack.Screen
				name={Routes.SenderReceiverPeople}
				component={SenderReceiverPeopleScreen}
			/>
		</RequestTransactionsStack.Navigator>
	);
}

const ReceiveTransactionsStack = createStackNavigator<
	ReceiveTransactionStackParams
>();

function ReceiveTransaction() {
	return (
		<ReceiveTransactionsStack.Navigator
			screenOptions={{
				headerShown: false,
				cardStyle: { backgroundColor: Colors.background }
			}}>
			<ReceiveTransactionsStack.Screen
				name={Routes.ReceiveAmount}
				component={ReceiveAmountScreen}
			/>
		</ReceiveTransactionsStack.Navigator>
	);
}

const Tab = createBottomTabNavigator();

export function Router() {
	const { logged } = useAuthContext();

	useEffect(() => {
		console.log('logged', logged);

		(isMountedRef as any).current = true;

		return () => {
			(isMountedRef as any).current = false;
		};
	}, []);

	return (
		<NavigationContainer>
			{logged ? (
			<Tab.Navigator
				tabBarOptions={{
					style: { paddingVertical: 10 },
					activeTintColor: Colors.blue[6]
				}}>
				<Tab.Screen
					name={Tabs.Chats}
					component={Chats}
					options={{
						tabBarIcon: ({ color }) => (
							<Icon type={(icon) => icon.Message} color={color} />
						)
					}}
				/>
				<Tab.Screen
					name={Tabs.Wallets}
					component={Wallets}
					options={{
						tabBarIcon: ({ color }) => (
							<Icon type={(icon) => icon.Wallets} color={color} />
						)
					}}
				/>
				<Tab.Screen
					name={Tabs.Profile}
					component={Profile}
					options={{
						tabBarIcon: ({ color }) => (
							<Icon type={(icon) => icon.Person} color={color} />
						)
					}}
				/>
			</Tab.Navigator>
			) : (
			<SafeAreaView style={{ flex: 1 }}>
				<AuthStack.Navigator
					screenOptions={{
						headerShown: false,
						cardStyle: { backgroundColor: Colors.background }
					}}>
					<AuthStack.Screen
						name={Routes.Authentication}
						component={AuthenticationScreen}
					/>
					<AuthStack.Screen
						name={Routes.AboutYouSocialMedia}
						component={AboutYouSocialMediaScreen}
					/>
					<AuthStack.Screen
						name={Routes.PhoneVerification}
						component={PhoneVerification}
					/>
					<AuthStack.Screen name={Routes.AboutYou} component={AboutYouScreen} />
					<AuthStack.Screen
						name={Routes.ForgotPassword}
						component={ForgotPasswordScreen}
					/>
				</AuthStack.Navigator>
			</SafeAreaView>
			)}
		</NavigationContainer>
	);
}
