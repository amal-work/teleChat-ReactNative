import { StyleSheet } from 'react-native';
import { Fonts, Typography } from 'environment';

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		width: '100%',
		paddingVertical: 16,
		borderRadius: 10,
		borderWidth: 1
	},
	iconContainer: { marginRight: 8 },
	title: {
		...Typography.body.large,
		fontFamily: Fonts.semi,
		opacity: 1
	},
	disabled: {
		opacity: 0.3
	},
	loader: {
		position: 'absolute'
	}
});
