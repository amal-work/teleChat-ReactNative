import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
	GoogleSignin,
	statusCodes
} from '@react-native-community/google-signin';
import analytics from '@react-native-firebase/analytics';

import { BaseButton } from './BaseButton';
import { Colors } from 'environment';
import { Routes, SocialType, AuthStackParams } from 'types';
import {
	useCheckUserExistsSocialMedia,
	useLoginSocialMediaMutation,
	useAuthContext
} from 'hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKey } from 'consts';

export type GoogleNavigationProp = StackNavigationProp<
	AuthStackParams,
	Routes.Authentication
>;

interface Props {
	navigation: GoogleNavigationProp;
}

export function GoogleButton({ navigation }: Props) {
	const [checkUser] = useCheckUserExistsSocialMedia();
	const [socialMediaLogin] = useLoginSocialMediaMutation();

	const { login: localLogin } = useAuthContext();

	async function signIn() {
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			console.log('userInfo', userInfo);

			const data = {
				token: userInfo.user.id || '',
				firstName: userInfo.user.givenName || '',
				lastName: userInfo.user.familyName || '',
				profilePicture: userInfo.user.photo || '',
				email: userInfo.user.email || ''
			};

			const res = await checkUser({
				variables: { token: userInfo.user.id || '' }
			});

			console.log('check user', res);
			await AsyncStorage.multiRemove([StorageKey.Key, StorageKey.Token]);
			if (!res.data?.checkUserExistsSocialMedia) {
				navigation.navigate(Routes.AboutYouSocialMedia, {
					type: SocialType.Google,
					data
				});
				await analytics().logLogin({ method: 'Google' });
			} else {
				const loginRes = await socialMediaLogin({
					variables: { token: userInfo.user.id || '' }
				});
				await AsyncStorage.setItem(StorageKey.Key, 'Google');
				await AsyncStorage.setItem(
					StorageKey.Token,
					loginRes.data?.loginSocialMedia || ''
				);
				// await registerDevice();
				await analytics().logSignUp({ method: 'Google' });
				console.log('loginRes: ', loginRes);
				localLogin(true);
			}
		} catch (error) {
			console.log(error);
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (e.g. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
			} else {
				// some other error happened
			}
		}
	}

	return (
		<BaseButton
			title='Google'
			backgroundColor={Colors.transparent}
			titleColor={Colors.gray[6]}
			borderColor={Colors.gray[4]}
			icon={(icons) => icons.GoogleLogo}
			onPress={signIn}
		/>
	);
}
