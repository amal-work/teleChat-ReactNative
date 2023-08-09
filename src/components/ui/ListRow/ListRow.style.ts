import { StyleSheet } from 'react-native';
import { Colors, Typography, Fonts } from 'environment';
import { useDimensions } from 'hooks';

const { isSmallDevice } = useDimensions();

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		// alignItems: 'center',
		// justifyContent: 'space-between',
		paddingVertical: 18,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.gray[1]
	},
	row: {
		flex: 2,
		justifyContent: 'center'
		// flexDirection: 'row'
		// alignItems: 'center'
		// paddingVertical: 18
	},
	textContainer: { marginLeft: 8 },
	headerContainer: { marginLeft: 8 },
	headerWithoutDescription: {
		...Typography.body.large,
		color: Colors.gray[8]
	},
	header: {
		fontFamily: Fonts.semi,
		fontSize: 16,
		color: Colors.gray[10]
		// marginBottom: 8
	},
	description: {
		...Typography.body.medium,
		color: Colors.gray[6],
		fontSize: isSmallDevice ? 12 : 14
	},
	value: {
		...Typography.body.large,
		fontFamily: Fonts.semi,
		color: Colors.gray[10]
	},
	info: {
		...Typography.body.medium,
		color: Colors.gray[6],
		fontSize: isSmallDevice ? 13 : 14
	},
	iconContainer: {
		height: 45,
		width: 45,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative'
	},
	iconBackground: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		borderRadius: 25,
		opacity: 0.1
	},
	icon: {
		position: 'absolute',
		zIndex: 1
	}
});
