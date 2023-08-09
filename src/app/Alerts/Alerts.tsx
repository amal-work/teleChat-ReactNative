import React, { useCallback, useEffect, useState } from 'react';
import uuid from 'uuid/v4';

import { Hub } from './Hub';
import { AlertsContext, SetAlertProps } from 'hooks';
import { Alert } from 'types';
import { AlertType } from 'consts';

interface Props {
	children: React.ReactNode;
	errors: Alert[];
}

export function Alerts({ errors, children }: Props) {
	const [items, setItems] = useState<Alert[]>([]);

	useEffect(() => {
		setItems(errors);
	}, [errors]);

	const setAlert = (
		type: AlertType,
		{ message, title, timeout }: SetAlertProps
	) =>
		setItems((state) => [
			...state,
			{ uuid: uuid(), type, message, title, timeout }
		]);

	const filterItems = useCallback(
		(uuid: string) =>
			setItems((items) => items.filter((item) => item.uuid !== uuid)),
		[]
	);

	return (
		<>
			<Hub items={items} filterItems={filterItems} />
			<AlertsContext.Provider
				value={{
					setNotification: (props: SetAlertProps) =>
						setAlert(AlertType.Notification, props),
					setError: (props: SetAlertProps) => setAlert(AlertType.Error, props)
				}}>
				{children}
			</AlertsContext.Provider>
		</>
	);
}
