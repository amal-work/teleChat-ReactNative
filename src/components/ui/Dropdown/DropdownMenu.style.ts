import { StyleSheet } from 'react-native';
import { Typography, Colors } from 'environment';

export default StyleSheet.create({
	indicator: {
		width: 50,
		height: 4,
		borderRadius: 5,
		backgroundColor: Colors.gray[4],
		marginTop: 8,
		marginBottom: 10,
		alignSelf: 'center'
	},
	title: {
		...Typography.body.large,
		marginBottom: 16,
		alignSelf: 'center'
	}
});
