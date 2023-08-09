import { StyleSheet } from 'react-native';
import { Typography, Fonts, Colors } from 'environment';
import { useDimensions } from 'hooks';

const { isSmallDevice } = useDimensions();

export default StyleSheet.create({
	walletAddressContainer: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginVertical: 30
	},
	textContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 10,
		paddingBottom: 4
	},
	label: {
		...Typography.body.medium,
		fontSize: 12,
		color: Colors.gray[6]
	},
	title: {
		...Typography.body.large,
		fontFamily: Fonts.semi,
		color: Colors.gray[6],
		paddingRight: isSmallDevice ? 66 : 0
	}
});
