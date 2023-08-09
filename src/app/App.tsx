import { GoogleSignin } from '@react-native-community/google-signin';
import React, { useState } from 'react';

import { ErrorBoundary } from './ErrorBoundary';
import { Apollo } from './Apollo';
import { Router } from './Router';
import { Alert } from 'types';
import { Alerts } from './Alerts';

GoogleSignin.configure({
	scopes: [
		'https://www.googleapis.com/auth/userinfo.profile',
		'https://www.googleapis.com/auth/userinfo.email',
		'https://www.googleapis.com/auth/user.phonenumbers.read',
		'https://www.googleapis.com/auth/user.birthday.read'
	]
});

export function App() {
	const [alerts] = useState<Alert[]>([]);

	return (
		<ErrorBoundary>
			<Alerts errors={alerts}>
				<Apollo>
					<Router />
				</Apollo>
			</Alerts>
		</ErrorBoundary>
	);
}
