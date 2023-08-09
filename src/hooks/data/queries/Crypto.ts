import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const CRYPTO_BALANCE_QUERY = gql`
	{
		getBalance {
			Naira {
				amount
				value
			}
			Eth {
				amount
				value
			}
			Usdc {
				amount
				value
			}
			Btc {
				amount
				value
			}
		}
	}
`;

const CRYPTO_TRANSACTIONS_QUERY = gql`
	{
		getTransactions {
			# sent
			sent {
				createdAt
				to {
					firstName
					lastName
					email
					profilePicture
					cashTag
				}
				amount
				currency
				type
			}
			# received
			received {
				createdAt
				owner {
					firstName
					lastName
					email
					profilePicture
					cashTag
				}
				amount
				currency
				type
			}
			# exchanged
			exchanged {
				createdAt
				owner {
					firstName
					lastName
					email
					profilePicture
					cashTag
				}
				amount
				toAmount
				currency
				toCurrency
				type
			}
			# deposited
			deposited {
				createdAt
				owner {
					firstName
					lastName
					email
					profilePicture
					cashTag
				}
				flutterwavetx {
					txtype
				}
				amount
				fromBank
				fromCrypto
				currency
				toCurrency
				toAmount
				type
			}
			# withdrawn
			withdrawn {
				createdAt
				owner {
					firstName
					lastName
					email
					profilePicture
					cashTag
				}
				amount
				toBank
				toCrypto
				toCryptoAddress
				currency
				type
			}
		}
	}
`;

const CRYPTO_WALLET_ADDRESSES = gql`
	{
		getWalletAddresses {
			Naira
			Eth
			Usdc
			Btc
		}
	}
`;

const CRYPTO_EXCHANGE_VALUE = gql`
	query exchangeValue($amount: Float!, $from: Currencies!, $to: Currencies!) {
		getExchangePrice(amount: $amount, from: $from, to: $to)
	}
`;

const CRYPTO_EXCHANGE_PRICES = gql`
	{
		getExchangePrices {
			Usdc {
				Btc
				Eth
				Naira
			}
			Btc {
				Usdc
				Eth
				Naira
			}
			Eth {
				Usdc
				Btc
				Naira
			}
			Naira {
				Usdc
				Eth
				Btc
			}
		}
	}
`;

const CRYPTO_DEPOSIT_PRICE = gql`
	query depositPrice($from: String!) {
		getDepositPrice(from: $from) {
			Usdc
			Btc
			Eth
			Naira
		}
	}
`;

export const useCryptoBalance = () => {
	return useQuery<{ getBalance: IGraphqlTypes.IGetBalanceQuery }>(
		CRYPTO_BALANCE_QUERY
	);
};

export const useCryptoTransactions = () => {
	return useQuery<{ getTransactions: IGraphqlTypes.IGetTransactions }>(
		CRYPTO_TRANSACTIONS_QUERY
	);
};

export const useCryptoWalletAddresses = () => {
	return useQuery<{ getWalletAddresses: IGraphqlTypes.IGetWalletAddresses }>(
		CRYPTO_WALLET_ADDRESSES
	);
};

export const useCryptoExchangeValue = () => {
	return useLazyQuery<
		{ getExchangePrice: number },
		IGraphqlTypes.IGetExchangePriceOnQueryArguments
	>(CRYPTO_EXCHANGE_VALUE);
};

export const useCryptoExchangePrices = () => {
	return useQuery<{ getExchangePrices: IGraphqlTypes.IGetExchangePrices }>(
		CRYPTO_EXCHANGE_PRICES
	);
};

export const useCryptoDepositPriceLazy = () => {
	return useLazyQuery<
		{ getDepositPrice: IGraphqlTypes.IDepositCurrencyPrice },
		IGraphqlTypes.IGetDepositPriceOnQueryArguments
	>(CRYPTO_DEPOSIT_PRICE);
};
