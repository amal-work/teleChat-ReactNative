import { StyleSheet } from 'react-native';
import { Typography, Colors } from 'environment';

export default StyleSheet.create({
	headerContainer: { marginLeft: 20, marginTop: 20 },
	header: { ...Typography.header.large },
	line: {
		borderColor: Colors.gray[2],
		height: 1,
		borderWidth: 0.5,
		borderRadius: 0.25,
		marginVertical: 20
	}
});
