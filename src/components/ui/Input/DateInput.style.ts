import { StyleSheet } from 'react-native';
import { Typography, Colors, Fonts } from 'environment';

export default StyleSheet.create({
	container: {
		borderBottomWidth: 1,
		borderBottomColor: Colors.gray[6],
		height: 25,
		marginBottom: 40
	},
	label: {
		...Typography.body.large,
		color: Colors.gray[6],
		position: 'absolute',
		top: 0
	},
	text: {
		...Typography.body.large,
		fontFamily: Fonts.semi,
		color: Colors.gray[10],
		backgroundColor: Colors.transparent
	},
	arrowRight: {
		position: 'absolute',
		right: 0
	},
	arrowDown: { position: 'absolute', right: 0, top: 5 }
});
