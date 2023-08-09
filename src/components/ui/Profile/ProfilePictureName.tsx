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
	bigSize?: boolean;
	alignCenter?: boolean;
	hideName?: boolean;
	header?: boolean;
}

export function ProfilePictureName({
	name,
	phone,
	icon,
	profilePicture,
	bigSize = false,
	alignCenter = false,
	hideName = false,
	header = false
}: Props) {
	return (
		<View
			style={[
				{ flexDirection: 'row', alignItems: 'center' },
				alignCenter && { flexDirection: 'column', justifyContent: 'center' }
			]}>
			<View
				style={[
					header ? styles.headerIconContainer : styles.iconContainer,
					bigSize && { width: 80, height: 80 }
				]}>
				{!!profilePicture ? (
					<Icon src={profilePicture} size={bigSize ? 60 : 40} />
				) : !!icon ? (
					<Icon type={icon} />
				) : (
					<Text
						style={[
							styles.iconText,
							header && { fontSize: 26 },
							bigSize && { fontSize: 50 }
						]}>
						{name.charAt(0).toUpperCase()}
					</Text>
				)}
			</View>
			<View>
				{!hideName && (
					<View>
						<Text style={[styles.text, { marginLeft: 8 }]}>{name}</Text>
						<Text style={[styles.phonetext, { marginLeft: 8 }]}>{phone}</Text>
					</View>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	iconContainer: {
		width: 60,
		height: 60,
		borderRadius: 40,
		backgroundColor: Colors.gray[2],
		justifyContent: 'center'
	},
	headerIconContainer: {
		width: 40,
		height: 40,
		borderRadius: 40,
		backgroundColor: Colors.gray[2],
		justifyContent: 'center',
		alignItems: 'center'
	},
	iconText: {
		...Typography.body.large,
		color: Colors.gray[10],
		fontSize: 40,
		fontFamily: Fonts.semi,
		alignSelf: 'center'
	},

	text: {
		...Typography.body.large,
		fontFamily: Fonts.semi,
		fontSize: 20
	},
	phonetext: {
		...Typography.body.large,
		fontFamily: Fonts.semi,
		color: Colors.blue[6]
	}
});
