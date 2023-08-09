import { StyleSheet } from 'react-native';
import { Colors } from 'environment';

export default StyleSheet.create({
	modal: {
		height: '100%',
		margin: 0,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	transfer: {
		margin: 0,
		alignItems: 'center'
	},
	transferContainer: {
		width: '100%',
		backgroundColor: Colors.white,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 20
	},
	container: {
		width: '100%',
		backgroundColor: Colors.white,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30
	},
	content: {
		width: '100%',
		paddingHorizontal: 20
	}
});
