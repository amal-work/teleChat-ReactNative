import React from 'react';
import {
	SafeAreaView,
	StyleSheet,
	View,
	KeyboardAvoidingView
} from 'react-native';

import { Colors } from 'environment';
import { useDimensions } from 'hooks';

interface Props {
	headerComponent?: React.ReactElement;
	footerComponent?: React.ReactElement;
	background?: React.ReactElement;
	children: React.ReactElement | React.ReactElement[];
	withoutPadding?: boolean;
}

export function Screen({
	headerComponent,
	footerComponent,
	background,
	withoutPadding = false,
	children
}: Props) {
	const { isMediumDevice } = useDimensions();

	return (
		<>
			<SafeAreaView style={styles(isMediumDevice).headerFooterContainer}>
				{headerComponent}
			</SafeAreaView>
			<SafeAreaView style={{ flex: 1 }}>
				<View
					style={[
						styles(isMediumDevice).container,
						withoutPadding && { paddingHorizontal: undefined },
						!!background && { backgroundColor: undefined }
					]}>
					{!!background && (
						<View
							style={{
								position: 'absolute',
								zIndex: -1
							}}>
							{background}
						</View>
					)}
					{children}
				</View>
			</SafeAreaView>
			<KeyboardAvoidingView behavior='padding'>
				<SafeAreaView style={styles(isMediumDevice).headerFooterContainer}>
					{footerComponent}
				</SafeAreaView>
			</KeyboardAvoidingView>
		</>
	);
}

const styles = (deviceSize: boolean) =>
	StyleSheet.create({
		container: {
			position: 'relative',
			flex: 1,
			paddingHorizontal: 20,
			marginBottom: deviceSize ? 20 : 0,
			backgroundColor: Colors.background
		},
		headerFooterContainer: {
			backgroundColor: Colors.white
		}
	});
