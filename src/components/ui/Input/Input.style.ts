import { StyleSheet } from 'react-native';
import { Colors, Fonts, Typography } from 'environment';

export default StyleSheet.create({
	container: {
		height: 25,
		marginBottom: 40,
		width: '100%'
	},
	label: {
		fontFamily: Fonts.regular,
		color: Colors.gray[6],
		position: 'absolute',
		top: 0
	},
	input: {
		...Typography.body.large,
		fontFamily: Fonts.semi,
		width: '100%',
		paddingBottom: 3,
		paddingTop: 4,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.gray[6],
		color: Colors.gray[10],
		backgroundColor: Colors.transparent
	},
	currency: {
		...Typography.body.large,
		fontFamily: Fonts.semi,
		paddingBottom: 4,
		color: Colors.gray[6],
		position: 'absolute',
		right: 0
	},
	error: {
		fontFamily: Fonts.regular,
		color: Colors.red[10],
		position: 'absolute',
		bottom: -20
	},
	errorLarge: {
		fontFamily: Fonts.regular,
		color: Colors.red[10],
		position: 'absolute',
		bottom: -60
	}
});
