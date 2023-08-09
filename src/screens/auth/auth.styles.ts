import { StyleSheet } from 'react-native';
import { Typography, Colors, Fonts } from 'environment';

export default StyleSheet.create({
	bar: {
		height: 1,
		borderBottomWidth: 0.75,
		borderColor: Colors.gray[6],
		flex: 1
	},
	title: { ...Typography.header.large, textAlign: 'center', marginBottom: 8 },
	subtitle: {
		...Typography.body.medium,
		textAlign: 'center'
	},
	inputContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 60
	},
	text: {
		...Typography.body.medium,
		fontFamily: Fonts.semi,
		color: Colors.blue[6]
	}
});
