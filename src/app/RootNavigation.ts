import * as React from 'react';

export const isMountedRef = React.createRef<{ current: boolean }>();

export const navigationRef = React.createRef<any>();

export function navigate(name: string, params?: { [key: string]: any }) {
	if (isMountedRef.current && navigationRef.current) {
		console.log('navigating from root nav');
		navigationRef.current.navigate(name, params);
	} else {
		console.log('not mounted navigation call', name);
	}
}
