import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Icons, Colors, Typography, Fonts } from 'environment';
import { Icon } from '../Icon';

interface Props {
	name: string;
	phone?: string;
	icon?: (icons: typeof Icons) => React.FC<SvgProps>;
	profilePicture?: string | null;
	hideName?: boolean;
	header?: boolean;
}

export function ProfilePictureName({
	name,
	phone,
	icon,
	profilePicture,
	hideName = false,
	header = false,
}: Props) {
	return (
		<View
			style={{ flexDirection: 'row' }}
		>
			<View style={header ? styles.headerIconContainer : styles.iconContainer}>
				{!!profilePicture ? (
					<Icon src={profilePicture} size={40} />
				) : !!icon ? (
					<Icon type={icon} />
				) : (
					<Text style={[styles.iconText, header && { fontSize: 26 }]}>
						{name.charAt(0).toUpperCase()}
					</Text>
				)}
			</View>
			<View style={{justifyContent: 'space-evenly', }}>
			{!hideName && (
				<Text style={[styles.text,{ marginLeft: 8 }]}>{name}</Text>
			)}
			<Text style={[styles.text,{ marginLeft: 8 }]}>{phone}</Text>
				</View>
		</View>
	);
}

const styles = StyleSheet.create({
	iconContainer: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginBottom: 8,
		backgroundColor: Colors.gray[2],
		justifyContent: 'center',
	},
	headerIconContainer: {
		width: 40,
		height: 40,
		borderRadius: 30,
		backgroundColor: Colors.gray[2],
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconText: {
		...Typography.body.large,
		color: Colors.gray[10],
		fontSize: 40,
		fontFamily: Fonts.semi,
		alignSelf: 'center',
	},

	text: {
		...Typography.body.large,
		fontFamily: Fonts.semi,
	},
});
