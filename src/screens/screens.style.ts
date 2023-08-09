import { StyleSheet } from 'react-native';
import { useDimensions } from 'hooks';

const { isMediumDevice } = useDimensions();

export default StyleSheet.create({
	default: {
		flex: 1,
		paddingHorizontal: 20,
		marginBottom: isMediumDevice ? 20 : 0
	},
	list: {
		paddingHorizontal: 20,
		marginBottom: isMediumDevice ? 20 : 0
	}
});
