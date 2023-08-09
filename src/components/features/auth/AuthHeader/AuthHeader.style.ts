import { StyleSheet } from 'react-native';
import { Typography } from 'environment';

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 36,
		marginTop: 24
	},
	iconsContainer: { flex: 1, justifyContent: 'center' },
	titleContainer: {
		flexDirection: 'row',
		flex: 4,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: { ...Typography.header.large, marginLeft: '3.3%' }
});
