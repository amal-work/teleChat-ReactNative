import { StyleSheet } from 'react-native';
import { Colors } from '../../environment';

export default StyleSheet.create({
	container: {
		position: 'absolute',
		width: '100%',
		top: 15,
		alignItems: 'center',
		elevation: 1000,
		zIndex: 1000
	},
	wrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 15,
		borderRadius: 5,
		marginBottom: 10,
		overflow: 'hidden'
	},
	content: {
		flex: 1,
		marginHorizontal: 10
	},
	life: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		height: 5
	},
	message: {
		color: Colors.white,
		fontSize: 14
	},
	title: {
		color: Colors.white,
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 5
	}
});
