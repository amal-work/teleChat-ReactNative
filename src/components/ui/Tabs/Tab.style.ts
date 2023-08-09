import { StyleSheet } from 'react-native';
import { Typography, Colors } from 'environment';

export default StyleSheet.create({
	container: {
		marginRight: 60
	},
	last: {
		marginRight: 0
	},
	tab: {
		...Typography.body.medium,
		color: Colors.gray[6]
	},
	active: {
		...Typography.header.medium,
		fontSize: 14,
		color: Colors.green[8]
	},
	currencyBalanceTab: {
		...Typography.body.medium,
		fontSize: 12,
		paddingVertical: 3,
		color: Colors.gray[6]
	},
	currencyBalanceActive: {
		...Typography.header.medium,
		fontSize: 12,
		color: Colors.blue[6]
	}
});
