import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const CRYPTO_SEND = gql`
	mutation sendCrypto($args: TransferCurrencyInput!) {
		sendCrypto(args: $args) {
			createdAt
			_id
		}
	}
`;

const CRYPTO_EXCHANGE = gql`
	mutation exchange($args: ExchangeCryptoInput!) {
		exchangeCrypto(args: $args)
	}
`;

export const useSendCrypto = () => {
	return useMutation<
		{ sendCrypto: IGraphqlTypes.IVaultTransaction },
		IGraphqlTypes.ISendCryptoOnMutationArguments
	>(CRYPTO_SEND);
};

export const useExchangeCrypto = () => {
	return useMutation<
		{ exchangeCrypto: boolean },
		IGraphqlTypes.IExchangeCryptoOnMutationArguments
	>(CRYPTO_EXCHANGE);
};
