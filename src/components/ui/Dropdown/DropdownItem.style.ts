import { StyleSheet } from 'react-native';
import { Colors } from 'environment';

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 56
	},
	border: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.gray[1]
	},
	content: {
		flex: 1
	}
});
