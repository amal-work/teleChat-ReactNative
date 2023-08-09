/**
 * No hooks available yet for componentDidCatch and getDerivedStateFromError
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export class ErrorBoundary extends React.Component {
	public state = {
		error: false
	};

	public componentDidCatch(error: Error, info: any) {
		console.log(error, info);
		this.setState({ error: true });
	}

	public render() {
		if (this.state.error) {
			return (
				<View style={styles.container}>
					<Text style={styles.text}>Something went wrong.</Text>
				</View>
			);
		}

		return this.props.children;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		color: '#000',
		fontSize: 20
	}
});
