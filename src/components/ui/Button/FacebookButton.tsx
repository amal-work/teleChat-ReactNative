import React from 'react';
import {
	AccessToken,
	LoginManager,
	GraphRequestManager,
	GraphRequest
} from 'react-native-fbsdk-next';

import { BaseButton } from './BaseButton';
import { Colors } from 'environment';
import { FacebookProps, Routes, SocialType, AuthStackParams } from 'types';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKey } from 'consts';
import {
	useCheckUserExistsSocialMedia,
	useLoginSocialMediaMutation,
	useAuthContext
} from 'hooks';

export type FacebookNavigationProp = StackNavigationProp<
	AuthStackParams,
	Routes.Authentication
>;

interface Props {
	navigation: FacebookNavigationProp;
}

export function FacebookButton({ navigation }: Props) {
	const [checkUser] = useCheckUserExistsSocialMedia();
	const [socialMediaLogin] = useLoginSocialMediaMutation();

	const { login: localLogin } = useAuthContext();

	function getInfoFromToken(token: string) {
		// Create a graph request asking for user information
		const infoRequest = new GraphRequest(
			'/me',
			{
				accessToken: token,
				parameters: {
					fields: {
						string:
							'email, first_name, last_name, birthday, picture.type(large)'
					}
				}
			},
			async (error: string, userInfo: FacebookProps) => {
				if (error) {
					console.log('login info has error: ' + error);
				} else {
					console.log('result:', userInfo);
					const validToken = token.substring(0, 13) + userInfo.id;
					const data = {
						token: validToken,
						firstName: userInfo.first_name,
						lastName: userInfo.last_name,
						profilePicture: userInfo.picture.data.url,
						birthday: userInfo.birthday,
						email: userInfo.email
					};
					const res = await checkUser({
						variables: { token: validToken }
					});

					await AsyncStorage.multiRemove([StorageKey.Key, StorageKey.Token]);
					if (!res.data?.checkUserExistsSocialMedia) {
						navigation.navigate(Routes.AboutYouSocialMedia, {
							type: SocialType.Facebook,
							data
						});
					} else {
						const loginRes = await socialMediaLogin({
							variables: { token: validToken }
						});
						await AsyncStorage.setItem(StorageKey.Key, 'Facebook');
						await AsyncStorage.setItem(
							StorageKey.Token,
							loginRes.data?.loginSocialMedia || ''
						);
						// await registerDevice();
						localLogin(true);
					}
				}
			}
		);
		new GraphRequestManager().addRequest(infoRequest).start();
	}

	function loginWithFacebook() {
		// showWarning('disabled', 'current platform is disabled for this beta');
		LoginManager.logInWithPermissions([
			'public_profile',
			'email',
			'user_birthday'
		]).then(
			function (result: FacebookProps) {
				if (result.isCancelled) {
				} else {
					AccessToken.getCurrentAccessToken().then((data: FacebookProps) => {
						const accessToken = data?.accessToken;
						if (accessToken) {
							getInfoFromToken(accessToken);
						}
					});
				}
			},
			function (error: string) {
				console.log('Login fail with error: ' + error);
			}
		);
	}

	return (
		<BaseButton
			title='Facebook'
			backgroundColor={Colors.facebook}
			icon={(icons) => icons.Facebook}
			onPress={loginWithFacebook}
		/>
	);
}
