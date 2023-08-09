import { useContext, createContext } from 'react';

export type ShowNotificationFn = (
	title: string,
	message: string,
	data?: object
) => void;

export type RegisterListenerFn = (
	event: string,
	callback: (data: object) => void
) => void;

interface NotificationContextValues {
	showNotification: ShowNotificationFn;
	device: {
		os: string;
		token: string;
	};
	registered: boolean;
	registerDevice: () => Promise<void>;
	//registerListener: RegisterListenerFn;
}

export const NotificationContext = createContext<NotificationContextValues>({
	showNotification: () => {},
	device: { os: '', token: '' },
	registered: false,
	registerDevice: () => new Promise(() => undefined)
	// registerListener: () => {}
});

export function useNotification(): NotificationContextValues {
	const { showNotification, device, registered, registerDevice } = useContext(
		NotificationContext
	);
	return { showNotification, device, registered, registerDevice };
}
