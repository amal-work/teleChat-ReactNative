import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { Bar } from '../Bar';
import { Icon } from '../Icon';
import { Input } from './Input';
import { Colors } from 'environment';
import { ChatOptions } from 'components/features';
import { useSpring } from 'react-spring';
import { useAlerts } from 'hooks';

interface Props {
	text: string;
	onChangeText: (text: string) => void;
	navigateToCamera?: () => void;
}

export function ConversationInput({
	text,
	onChangeText,
	navigateToCamera
}: Props) {
	const [showChatOptions, setShowChatOpstions] = useState(false);
	const [changeToSend, setChangeToSend] = useState(false);

	const { setNotification, setError } = useAlerts();

	function handleOnBlur() {
		if (text.length === 0) {
			setChangeToSend(false);
		}
	}

	const { rotate } = useSpring({
		rotate: showChatOptions ? 7 : 0,
		config: { duration: 400 }
	});

	return (
		<View style={styles.container}>
			<Bar />
			<View
				style={{
					flexDirection: 'row',
					paddingVertical: 18,
					alignItems: 'center'
				}}>
				<Icon
					type={(icons) => icons.Plus}
					size={13}
					style={[styles.action, { transform: [{ rotate: showChatOptions ? '45deg' : '0deg'}]}]}
					onPress={() => setShowChatOpstions(!showChatOptions)}
				/>
				<View
					style={{
						flex: 1,
						marginHorizontal: 8
					}}>
					<View style={styles.inputContainer}>
						<Input
							containerStyle={{ marginBottom: 0 }}
							style={{ borderBottomWidth: undefined }}
							value={text}
							onFocus={() => setChangeToSend(true)}
							onBlur={handleOnBlur}
							onChangeText={onChangeText}
						/>
					</View>
				</View>
				<View style={styles.send}>
					{!changeToSend ? (
						<Icon
							type={(icons) => icons.Mic}
							size={18}
							onPress={() =>
								setNotification({ message: 'Test', title: 'TitleTest' })
							}
						/>
					) : (
						<Icon
							type={(icons) => icons.Send}
							size={15}
							onPress={() => setError({ message: 'Test', title: 'TitleTest' })}
						/>
					)}
				</View>
			</View>
			{showChatOptions && <ChatOptions navigateToCamera={navigateToCamera} />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: Colors.gray[2],
		backgroundColor: Colors.white,
		paddingHorizontal: 20
	},
	action: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: Colors.blue[2],
		justifyContent: 'center',
		alignItems: 'center'
	},
	inputContainer: {
		height: 40,
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 8,
		borderColor: Colors.gray[2],
		backgroundColor: '#8D919B0D',
		justifyContent: 'center',
		paddingHorizontal: 7
	},
	send: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: Colors.blue[6],
		justifyContent: 'center',
		alignItems: 'center'
	}
});
