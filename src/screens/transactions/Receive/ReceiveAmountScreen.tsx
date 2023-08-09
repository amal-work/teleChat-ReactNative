import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { Header, PrimaryButton, GhostButton, Icon } from 'components/ui';

import screenStyles from '../../screens.style';
import styles from './ReceiveAmountScreen.style';
import { Routes } from 'types';
import { ReceiveAmountScreenNavigationProp } from './ReceiveAmountScreen.types';

interface Props {
	navigation: ReceiveAmountScreenNavigationProp;
}

export function ReceiveAmountScreen({ navigation: { navigate } }: Props) {
	return (
		<View style={{ flex: 1 }}>
			<Header title="Receive USD" />
			<SafeAreaView style={{ flex: 1 }}>
				<View style={screenStyles.default}>
					<View style={{ flex: 1 }}>
						<View style={{ paddingVertical: 40 }}>
						</View>
						<View style={styles.walletAddressContainer}>
							<Text style={styles.label}>USD Wallet Address</Text>
							<View style={styles.textContainer}>
								<Text style={styles.title}>
									1Mz7153HMuxXTuR2R1t78mGSdzaAtNb
								</Text>
								<Icon type={(icons) => icons.Copy} size={13} />
							</View>
						</View>
						<GhostButton
							icon={(icons) => icons.Share}
							title="Share address"
							onPress={() => {}}
						/>
					</View>
					<PrimaryButton
						containerStyle={{ alignSelf: 'flex-end' }}
						title="Done"
						onPress={() => navigate(Routes.Wallets)}
					/>
				</View>
			</SafeAreaView>
		</View>
	);
}
