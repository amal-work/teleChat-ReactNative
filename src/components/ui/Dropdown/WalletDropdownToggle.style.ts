import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'environment';

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 10,
		borderColor: Colors.gray[4],
		width: '100%',
		paddingVertical: 20
	},
	title: {
		...Typography.header.medium,
		fontSize: 16,
		marginLeft: 8,
		alignSelf: 'center'
	},
	currency: {
		...Typography.body.medium,
		color: Colors.gray[6],
		marginLeft: 8,
		alignSelf: 'center'
	},
	rate: { ...Typography.body.medium, marginRight: 10, alignSelf: 'center' }
});
