import { StyleSheet } from 'react-native';
import { Typography, Fonts, Colors } from 'environment';

export default StyleSheet.create({
	container: {
		height: 48
	},
	input: {
		...Typography.body.large,
		fontFamily: Fonts.semi,
		width: '100%',
		paddingBottom: 5,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.gray[6],
		color: Colors.gray[10],
		backgroundColor: Colors.transparent
	},
	label: {
		...Typography.body.large,
		color: Colors.gray[6],
		position: 'absolute'
	},
	icon: { position: 'absolute', right: 0, top: -5 }
});
