import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: { display: 'flex', flex: 1 },
	subtitleContainer: {
		alignItems: 'center',
		paddingHorizontal: 10,
		marginBottom: 40
	},
	socialButtonsContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-around'
	},
	inputContainers: {
		position: 'relative',
		marginTop: 40
	},
	section: {
		position: 'absolute',
		width: '100%'
	}
});
