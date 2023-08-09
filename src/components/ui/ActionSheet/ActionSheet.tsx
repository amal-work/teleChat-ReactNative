import React from 'react';
import { SafeAreaView, View, ViewStyle, StyleProp } from 'react-native';
import Modal from 'react-native-modal';

import { Colors } from 'environment';

import styles from './ActionSheet.style';

export interface Props {
	visible: boolean;
	pin?: boolean;
	screen?: boolean;
	transfer?: boolean;
	children: React.ReactNode;
	modalStyle?: StyleProp<ViewStyle>;
	containerStyle?: StyleProp<ViewStyle>;
	contentStyle?: StyleProp<ViewStyle>;
	onClose: () => void;
}

export function ActionSheet({
	visible,
	pin,
	screen,
	transfer,
	children,
	modalStyle,
	containerStyle,
	contentStyle,
	onClose
}: Props) {
	if (pin || screen) {
		return (
			<Modal
				animationIn='slideInUp'
				animationOut='slideOutDown'
				backdropColor={pin ? Colors.green[10] : Colors.background}
				backdropOpacity={1}
				isVisible={visible}
				hideModalContentWhileAnimating
				useNativeDriver
				style={modalStyle}
				onBackButtonPress={onClose}
				onBackdropPress={onClose}>
				<View style={{ flex: 1 }}>{children}</View>
			</Modal>
		);
	}
	if (transfer) {
		return (
			<Modal
				animationIn='slideInUp'
				animationOut='slideOutDown'
				backdropColor={Colors.backdrop}
				isVisible={visible}
				hideModalContentWhileAnimating
				useNativeDriver
				style={styles.transfer}
				onBackButtonPress={onClose}
				onBackdropPress={onClose}>
				<View
					style={[styles.transferContainer, { justifyContent: 'flex-end' }]}>
					{children}
				</View>
			</Modal>
		);
	}
	return (
		<Modal
			animationIn='slideInUp'
			animationOut='slideOutDown'
			backdropColor={Colors.backdrop}
			isVisible={visible}
			hideModalContentWhileAnimating
			useNativeDriver
			style={[styles.modal, modalStyle]}
			onBackButtonPress={onClose}
			onBackdropPress={onClose}>
			<SafeAreaView style={[styles.container, containerStyle]}>
				<View style={[styles.content, contentStyle]}>{children}</View>
			</SafeAreaView>
		</Modal>
	);
}
