import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { MessageType } from 'consts';
import { Colors, Typography } from 'environment';
import { Icon } from '../Icon';

interface Props {
	message: string;
	messageType: MessageType;
	dateTime?: string;
}

export function Message({ message, messageType, dateTime }: Props) {
	return (
		<View
			style={
				messageType === 'Sent'
					? { alignItems: 'flex-end' }
					: { alignItems: 'flex-start' }
			}>
			<View
				style={[
					messageType === 'Sent' ? styles.messageSent : styles.messageReceived,
					{ padding: 10 }
				]}>
				<Text
					style={
						messageType === 'Sent'
							? {
									color: Colors.white
							  }
							: { color: Colors.gray[10] }
					}>
					{message}
				</Text>
			</View>
			<View style={{ flexDirection: 'row' }}>
				{dateTime && (
					<Text style={{ ...Typography.body.small }}>{dateTime}</Text>
				)}
				<View style={{ position: 'relative', justifyContent: 'flex-end' }}>
					<Icon
						style={{ position: 'absolute' }}
						type={(icons) => icons.Check}
						color={Colors.gray[2]}
						size={14}
					/>
					<Icon
						style={{ position: 'absolute', left: 6 }}
						type={(icons) => icons.Check}
						color={Colors.gray[2]}
						size={14}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	messageSent: {
		marginVertical: 8,
		backgroundColor: Colors.blue[4],
		borderRadius: 12,
		borderBottomRightRadius: 0,
		maxWidth: '90%'
	},
	messageReceived: {
		marginVertical: 8,
		borderRadius: 12,
		borderBottomLeftRadius: 0,
		backgroundColor: Colors.blue[2],
		maxWidth: '90%'
	}
});
