import { StyleSheet } from 'react-native';
import { Colors, Fonts, Typography } from 'environment';

export default StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	button: {
		marginTop: 40,
		marginBottom: 32
	},
	subtitle: {
		...Typography.body.medium
	},
	text: {
		...Typography.body.medium,
		fontFamily: Fonts.semi,
		color: Colors.blue[6]
	}
});
