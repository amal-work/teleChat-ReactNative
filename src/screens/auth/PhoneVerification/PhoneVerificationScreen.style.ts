import { StyleSheet } from 'react-native';
import { Typography, Colors, Fonts } from 'environment';

export default StyleSheet.create({
	titleContainer: {
		alignItems: 'center',
		marginBottom: 48,
		paddingHorizontal: 10
	},
	email: {
		...Typography.body.medium,
		fontFamily: Fonts.semi,
		color: Colors.green[10]
	},
	iconContainer: {
		marginBottom: 48,
		alignItems: 'center'
	},
	inputContainer: {
		borderBottomWidth: 1,
		borderColor: Colors.gray[2]
	},
	input: {
		...Typography.header.medium,
		width: 50,
		height: 34,
		textAlign: 'center'
	}
});
