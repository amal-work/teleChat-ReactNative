import { StyleSheet } from 'react-native';
import { Typography } from 'environment';

export default StyleSheet.create({
	itemWrapper: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	country: {
		...Typography.body.large
	},
	code: {
		...Typography.body.medium
	},
	image: { width: 32, height: 32, marginRight: 5 }
});
