import { StyleSheet } from 'react-native';
import { Typography, Colors } from 'environment';

export default StyleSheet.create({
	container: {
		width: 80,
		height: 80,
		marginHorizontal: 10,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: Colors.gray[1]
	},
	selected: { borderColor: Colors.blue[6], backgroundColor: Colors.blue[1] },
	content: {
		paddingVertical: 9,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		...Typography.body.medium,
		marginTop: 4
	}
});
