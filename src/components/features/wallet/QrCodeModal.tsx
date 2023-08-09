import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { GhostButton, Icon, ActionSheet } from 'components/ui';
import { Typography, Fonts, Colors } from 'environment';
import { useDimensions } from 'hooks';
import { SelectCryptoCurrency } from './SelectCryptoCurrency';
import QRCode from 'react-native-qrcode-svg';

interface Props {
	modalVisibility: boolean;
	handleOnCloseModal: () => void;
}

export function QrCodeModal({ modalVisibility, handleOnCloseModal }: Props) {
	const [crypto, setSelectCrypto] = useState('');

	function selectCrypto(coin: string) {
		setSelectCrypto(coin);
	}

	return (
		<ActionSheet visible={modalVisibility} onClose={handleOnCloseModal}>
			<View style={styles.bar} />
			<SelectCryptoCurrency
				selectedCrypto={crypto}
				handleSelectCrypto={selectCrypto}
			/>
			<View style={{ paddingVertical: 20, alignItems: 'center' }}>
				<QRCode value='1Mz7153HMuxXTuR2R1t78mGSdzaAtNb' size={170} />
			</View>
			<View style={styles.walletAddressContainer}>
				<Text style={styles.label}>{crypto} Wallet Address</Text>
				<View style={styles.textContainer}>
					<Text style={styles.title}>1Mz7153HMuxXTuR2R1t78mGSdzaAtNb</Text>
					<Icon
						type={(icons) => icons.Copy}
						size={13}
						style={{ alignSelf: 'center' }}
					/>
				</View>
			</View>
			<GhostButton
				containerStyle={{ marginBottom: 20 }}
				icon={(icons) => icons.Share}
				title='Share address'
				onPress={() => {}}
			/>
		</ActionSheet>
	);
}

const { isSmallDevice } = useDimensions();

const styles = StyleSheet.create({
	bar: {
		height: 4,
		width: 32,
		borderRadius: 2,
		backgroundColor: Colors.gray[1],
		alignSelf: 'center',
		marginTop: 8
	},
	walletAddressContainer: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginVertical: 30
	},
	textContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 10,
		paddingBottom: 4
	},
	label: {
		...Typography.body.medium,
		fontSize: 12,
		color: Colors.gray[6]
	},
	title: {
		...Typography.body.large,
		fontFamily: Fonts.semi,
		color: Colors.gray[6],
		paddingRight: isSmallDevice ? 66 : 0
	}
});
