import { StyleSheet } from 'react-native';
import { Typography, Fonts, Colors } from 'environment';

const styles = (whiteContent?: boolean) =>
	StyleSheet.create({
		balance: {
			...Typography.body.medium,
			color: whiteContent ? Colors.white : Colors.gray[6]
		},
		bigText: {
			...Typography.header.medium,
			fontFamily: Fonts.bold,
			fontSize: 48,
			color: whiteContent ? Colors.white : Colors.blue[6],
			alignSelf: 'flex-end'
		},
		smallText: {
			...Typography.header.medium,
			fontFamily: Fonts.bold,
			color: whiteContent ? Colors.white : Colors.blue[6],
			paddingBottom: 8,
			alignSelf: 'flex-end'
		},
		remainAmount: {
			...Typography.body.medium,
			color: Colors.white
		},
		remainAmountSemiBold: {
			...Typography.body.medium,
			fontFamily: Fonts.semi,
			color: Colors.white
		}
	});

export default styles;
