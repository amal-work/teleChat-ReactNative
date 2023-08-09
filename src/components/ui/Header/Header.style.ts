import { StyleSheet } from 'react-native';
import { Colors, Typography } from 'environment';

export default StyleSheet.create({
	container: {
		backgroundColor: Colors.white
	},
	border: {
		borderBottomWidth: 1,
		borderColor: Colors.gray[1]
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20
	},
	actionContainer: {
		flex: 1
	},
	titleContainer: {
		flex: 6,
		alignItems: 'center'
	},
	title: {
		...Typography.header.medium,
		color: Colors.gray[10]
	},
	description: {
		...Typography.body.small,
		color: Colors.gray[6]
	},
	time: {
		...Typography.body.medium,
		color: Colors.blue[6]
	}
});
