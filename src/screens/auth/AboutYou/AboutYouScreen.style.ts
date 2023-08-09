import { StyleSheet } from 'react-native';
import { Typography } from 'environment';

export default StyleSheet.create({
	titleContainer: {
		alignItems: 'center',
		paddingHorizontal: 10,
		marginBottom: 64
	},
	inputContainer: { flexDirection: 'row', marginBottom: 16 },
	dateContainer: { marginBottom: 36 },
	infoBirthDate: {
		...Typography.body.medium,
		fontSize: 12,
		marginTop: 8
	}
});
