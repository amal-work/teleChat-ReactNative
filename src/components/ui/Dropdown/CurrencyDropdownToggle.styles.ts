import { StyleSheet } from 'react-native';
import { Fonts, Colors } from 'environment';

export default StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	currencyText: {
		fontFamily: Fonts.semi,
		fontSize: 16,
		color: Colors.gray[6],
		marginRight: 5
	}
});
