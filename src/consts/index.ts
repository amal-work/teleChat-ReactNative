export { AuthContext } from './context';
export { default as CountyDataList } from './county-json.json';

export const DEFAULT_ACTIVITY_TIMEOUT = 3000;

export enum AlertType {
	Notification = 'notification',
	Error = 'error'
}

export enum Environment {
	Development = 'development',
	Production = 'production'
}

export enum OS {
	iOS = 'ios',
	Android = 'android'
}

export enum MessageType {
	SENT = 'Sent',
	RECEIVED = 'RECEIVED'
}

export enum KeyboardEvent {
	DidShow = 'keyboardDidShow',
	DidHide = 'keyboardDidHide',
	WillShow = 'keyboardWillShow',
	WillHide = 'keyboardWillHide'
}

export enum KeyboardType {
	Default = 'default',
	Numeric = 'numeric',
	Email = 'email-address',
	Phone = 'phone-pad'
}

export enum ReturnKey {
	Done = 'done',
	Next = 'next',
	Search = 'search',
	Send = 'send',
	Go = 'go',
	Default = 'default'
}

export enum KeyboardKey {
	Backspace
}

export enum SoftInputMode {
	Resize = 'resize',
	Pan = 'pan',
	Nothing = 'nothing'
}

export enum StorageKey {
	LanguageCode = 'coins-language-code',
	Token = 'coins-auth-token',
	Key = 'coins-auth-key'
}
