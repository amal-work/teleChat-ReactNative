import React from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appleAuth, {
	AppleButton,
	AppleAuthRequestOperation,
	AppleAuthRequestScope,
	AppleAuthCredentialState
} from '@invertase/react-native-apple-authentication';
import analytics from '@react-native-firebase/analytics';

import {
	useCheckUserExistsSocialMedia,
	useLoginSocialMediaMutation,
	useAuthContext,
	useNotification
} from 'hooks';
import { StorageKey } from 'consts';
import { Routes, SocialType } from 'types';

export function AppleSignInButton({ navigation }: any) {
	const [checkUser] = useCheckUserExistsSocialMedia();
	const [socialMediaLogin] = useLoginSocialMediaMutation();

	const { login: localLogin } = useAuthContext();
	const { registerDevice } = useNotification();

	const isSupported =
		appleAuth.isSupported && appleAuth.isSignUpButtonSupported;

	async function onLogin() {
		const responseObject = await appleAuth.performRequest({
			requestedOperation: AppleAuthRequestOperation.LOGIN,
			requestedScopes: [
				AppleAuthRequestScope.EMAIL,
				AppleAuthRequestScope.FULL_NAME
			]
		});

		console.log(responseObject, 'response object');

		const credentialState = await appleAuth.getCredentialStateForUser(
			responseObject.user
		);

		if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
			const data = {
				token: responseObject.user || '',
				firstName: responseObject.fullName?.givenName || '',
				lastName: responseObject.fullName?.familyName || '',
				profilePicture: '', //userInfo.user.photo || '',
				email: responseObject.email || ''
			};
			console.log(data);

			const res = await checkUser({
				variables: { token: responseObject.user || '' }
			});
			await AsyncStorage.multiRemove([StorageKey.Key, StorageKey.Token]);
			if (!res.data?.checkUserExistsSocialMedia) {
				navigation.navigate(Routes.AboutYouSocialMedia, {
					type: SocialType.Apple,
					data
				});
				await analytics().logLogin({ method: 'Apple' });
			} else {
				const loginRes = await socialMediaLogin({
					variables: { token: responseObject.user || '' }
				});
				await AsyncStorage.setItem(StorageKey.Key, 'Apple');
				await AsyncStorage.setItem(
					StorageKey.Token,
					loginRes.data?.loginSocialMedia || ''
				);
				await registerDevice();
				await analytics().logSignUp({ method: 'Apple' });
				console.log('loginRes: ', loginRes);
				localLogin(true);
			}
		}
	}

	return isSupported ? (
		<View style={{ width: '50%', marginTop: 10 }}>
			<AppleButton
				style={{ width: '100%', padding: 30 }}
				cornerRadius={10}
				buttonStyle={AppleButton.Style.BLACK}
				buttonType={AppleButton.Type.SIGN_IN}
				onPress={onLogin}
			/>
		</View>
	) : null;
}
