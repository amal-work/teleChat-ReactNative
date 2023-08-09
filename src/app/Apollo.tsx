import { ApolloProvider } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { Subscription } from 'apollo-client/util/Observable';
import { ApolloLink, Observable, Operation } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import React from 'react';

import { StorageKey } from 'consts';
import { ENV } from 'environment';
import { useMemoOnce } from 'hooks';

interface Props {
	children: React.ReactNode;
}

const setHeaders = async (op: Operation) => {
	const token = await AsyncStorage.getItem(StorageKey.Token);
	const key = await AsyncStorage.getItem(StorageKey.Key);

	op.setContext({
		headers: {
			authorization: `${key || 'Bearer'} ${token}`,
		},
	});
};

const request = new ApolloLink(
	(operation, forward) =>
		new Observable((observer) => {
			let handle: Subscription;

			Promise.resolve(operation)
				.then((op) => setHeaders(op))
				.then(() => {
					handle = forward(operation).subscribe({
						next: observer.next.bind(observer),
						error: observer.error.bind(observer),
						complete: observer.complete.bind(observer),
					});
				})
				.catch(observer.error.bind(observer));

			return () => {
				if (handle) {
					handle.unsubscribe();
				}
			};
		})
);

export const Apollo = ({ children }: Props) => {
	const client = useMemoOnce(
		() =>
			new ApolloClient({
				link: ApolloLink.from([
					onError(({ graphQLErrors, networkError }) => {
						if (graphQLErrors) {
							graphQLErrors.forEach(({ message }) => {
								console.log(`[GraphQL error]: Message: ${message}`);
							});
						}

						if (networkError) {
							console.log(`[Network error]: ${networkError}`);
						}
					}),
					request,
					new HttpLink({
						uri: `${ENV.API_ROOT}/graphql`,
					}),
				]),
				cache: new InMemoryCache(),
			})
	);

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
