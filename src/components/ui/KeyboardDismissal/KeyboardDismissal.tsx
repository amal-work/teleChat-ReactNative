import React from 'react';
import { Keyboard, ScrollView, StyleProp, ViewStyle } from 'react-native';

import { KeyboardEvent } from 'consts';
import { resetScroll } from 'helpers';
import { useEffectOnce } from 'hooks';

interface Props {
	children: React.ReactElement | React.ReactElement[];
	scrollRef?: React.RefObject<ScrollView>;
	scrollEnabled?: boolean;
	contentContainerStyle?: StyleProp<ViewStyle>;
	style?: StyleProp<ViewStyle>;
	onDismiss?: () => void;
}

export function KeyboardDismissal({
	children,
	scrollRef,
	scrollEnabled = true,
	contentContainerStyle,
	style,
	onDismiss
}: Props) {
	useEffectOnce(() => {
		function listener() {
			if (scrollRef) {
				resetScroll(scrollRef);
			}

			onDismiss && onDismiss();
		}

		Keyboard.addListener(KeyboardEvent.WillHide, listener);
		return () => Keyboard.removeListener(KeyboardEvent.WillHide, listener);
	});

	return (
		<ScrollView
			ref={scrollRef}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={contentContainerStyle}
			keyboardShouldPersistTaps='handled'
			scrollEnabled={scrollEnabled}
			style={style}
			scrollEventThrottle={16}>
			{children}
		</ScrollView>
	);
}
