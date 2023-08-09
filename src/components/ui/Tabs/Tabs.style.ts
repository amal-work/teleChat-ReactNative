import { StyleSheet } from 'react-native';
import { Colors } from 'environment';

export default StyleSheet.create({
	container: {
		backgroundColor: Colors.white
	},
	scroll: {
		position: 'relative',
		alignItems: 'center',
		paddingHorizontal: 20,
		marginBottom: 10,
		backgroundColor: Colors.white
	},
	currencyBalanceScroll: {
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 25,
		backgroundColor: Colors.white
	},
	border: {
		borderBottomWidth: 1,
		borderColor: Colors.gray[1]
	},
	indicator: {
		position: 'absolute',
		bottom: 0,
		height: 2,
		backgroundColor: Colors.blue[6],
		borderRadius: 1
	},
	currencyBalanceIndicator: {
		position: 'absolute',
		height: '100%',
		backgroundColor: Colors.blue[6],
		opacity: 0.12,
		borderRadius: 20
	},
	content: {
		flexDirection: 'row',
		width: '100%',
		height: '95%'
	},
	tabContainer: {
		marginRight: 9,
		width: 60,
		alignItems: 'center'
	}
});
