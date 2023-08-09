import React from 'react';
import { CryptoPicker } from 'components/ui';
import { CryptoBox } from 'components/ui/CryptoPicker/CryptoBox';

interface Props {
	selectedCrypto: string;
	handleSelectCrypto: (crypto: string) => void;
}

export function SelectCryptoCurrency({
	selectedCrypto,
	handleSelectCrypto
}: Props) {
	return (
		<CryptoPicker
			selectedCrypto={selectedCrypto}
			handleSelect={handleSelectCrypto}>
			<CryptoBox title='Bitcoin' icon={(icons) => icons.Bitcoin} />
			<CryptoBox title='Ethereum' icon={(icons) => icons.Ethereum} />
			<CryptoBox title='USD' icon={(icons) => icons.Usd} />
			<CryptoBox title='Naira' icon={(icons) => icons.Naira} />
		</CryptoPicker>
	);
}
