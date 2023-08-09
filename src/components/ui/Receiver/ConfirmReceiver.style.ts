import { StyleSheet } from 'react-native';
import { Typography, Fonts, Colors } from 'environment';
import { useDimensions } from 'hooks';

const { isMediumDevice } = useDimensions();

export default StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingBottom: isMediumDevice ? 20 : 0
	},
	avatar: {
		marginTop: 20,
		marginBottom: 8
	},
	name: {
		...Typography.body.large,
		fontFamily: Fonts.semi,
		marginBottom: 4
	},
	id: {
		...Typography.body.medium,
		marginBottom: 16
	},
	moneyContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		marginBottom: 20
	},
	currency: {
		...Typography.header.medium,
		fontFamily: Fonts.bold,
		color: Colors.blue[6],
		marginBottom: 4,
		marginRight: 8
	},
	value: {
		fontSize: 32,
		fontFamily: Fonts.bold,
		color: Colors.blue[6]
	}
});
