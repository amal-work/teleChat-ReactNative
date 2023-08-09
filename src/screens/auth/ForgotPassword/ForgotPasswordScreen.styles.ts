import { StyleSheet } from 'react-native';
import { Typography } from 'environment';
import { useDimensions } from 'hooks';

const { isSmallDevice } = useDimensions();

export default StyleSheet.create({
	keyboardWrapper: {
		paddingBottom: isSmallDevice ? 250 : 0
	},
	titleContainer: {
		alignItems: 'center',
		marginBottom: isSmallDevice ? 30 : 48,
		paddingHorizontal: 10
	},
	iconContainer: {
		marginBottom: isSmallDevice ? 30 : 48,
		alignItems: 'center'
	},
	buttonWrapper: {
		marginBottom: isSmallDevice ? 20 : 30,
		marginTop: isSmallDevice ? 0 : 10
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	subtitle: {
		...Typography.body.medium
	}
});
