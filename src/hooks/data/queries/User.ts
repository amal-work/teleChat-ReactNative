import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const USER_QUERY = gql`
	{
		currentUser {
			_id
			createdAt
			updatedAt
			email
			phone
			firstName
			lastName
			dateOfBirth
			profilePicture
			accountType
			cashTag
			token
			userQrCode
		}
	}
`;

const USER_CONTACTS_QUERY = gql`
	{
		listContacts {
			cashTag
			firstName
			profilePicture
			lastName
		}
	}
`;

export const useCurrentUser = () => {
	return useQuery<{ currentUser: IGraphqlTypes.IUser }>(USER_QUERY, {
		fetchPolicy: 'network-only'
	});
};

export const useContactsQuery = () => {
	return useQuery<{ listContacts: IGraphqlTypes.IUser[] }>(USER_CONTACTS_QUERY);
};
