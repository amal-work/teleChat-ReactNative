import { ScrollView, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StorageKey } from 'consts';

export function focusTouchableOpacity(ref: React.RefObject<TouchableOpacity>) {
	if (ref.current) {
		// @ts-ignore
		ref.current.touchableHandlePress(this);
	}
}

export function focusInput(ref: React.RefObject<TextInput>) {
	if (ref.current) {
		ref.current.focus();
	}
}

export function resetScroll(ref: React.RefObject<ScrollView>) {
	if (ref.current) {
		ref.current.scrollTo({ y: 0 });
	}
}

export const getToken = async () => {
	let token = await AsyncStorage.getItem(StorageKey.Token);
	return token;
};
