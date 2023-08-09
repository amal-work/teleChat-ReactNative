import { StyleSheet } from 'react-native';
import { Colors, Typography, Fonts } from 'environment';

export default StyleSheet.create({
	bar: {
		height: 4,
		width: 32,
		borderRadius: 2,
		backgroundColor: Colors.gray[1],
		alignSelf: 'center',
		marginTop: 8
	},
	container: { height: '100%', backgroundColor: Colors.background },
	titleContainer: {
		marginTop: 34,
		alignItems: 'center',
		justifyContent: 'space-evenly',
		flex: 2
	},
	modalTitleContainer: {
		alignItems: 'center',
		justifyContent: 'space-evenly',
		marginTop: 20
	},
	title: {
		...Typography.header.medium,
		fontFamily: Fonts.semi,
		color: Colors.gray[8]
	},
	modalTitle: {
		...Typography.body.large,
		color: Colors.gray[8]
	},
	subtitle: {
		...Typography.body.medium,
		fontFamily: Fonts.semi,
		color: Colors.red[10]
	},
	textContainer: { marginTop: 20, alignItems: 'center' },
	text: {
		...Typography.body.medium,
		fontFamily: Fonts.semi,
		color: Colors.gray[8]
	}
});
