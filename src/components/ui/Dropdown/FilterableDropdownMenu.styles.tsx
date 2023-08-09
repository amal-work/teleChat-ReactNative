import { StyleSheet } from 'react-native';
import { Colors } from 'environment';

import dropdownMenuStyles from './DropdownMenu.style';

export default StyleSheet.create({
	...dropdownMenuStyles,
	search: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		backgroundColor: Colors.gray[1],
		borderRadius: 15
	}
});
