import { StyleSheet } from 'react-native';
import { Typography, Fonts, Colors } from 'environment';

export default StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	iconsWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 10
	},
	flag: {
		width: 32,
		height: 20,
		marginRight: 5
	},
	phoneCodeText: {
		...Typography.body.large,
		fontFamily: Fonts.semi,
		color: Colors.gray[6],
		paddingRight: 3
	}
});
