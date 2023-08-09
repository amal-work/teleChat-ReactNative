import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const USER_LOGIN = gql`
	mutation UserLogin($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`;

const USER_SIGNUP = gql`
	mutation UserSignup($email: String!, $phone: String!, $password: String!) {
		register(email: $email, phone: $phone, password: $password) {
			token
		}
	}
`;

const USER_LOGIN_SOCIAL_MEDIA = gql`
	mutation LoginSocialMedia($token: String!) {
		loginSocialMedia(token: $token)
	}
`;

const USER_REGISTER_SOCIAL_MEDIA = gql`
	mutation RegisterSocialMedia(
		$type: String!
		$email: String!
		$firstName: String!
		$lastName: String!
		$profilePicture: String!
		$dateOfBirth: DateTime!
		$phone: String!
		$token: String!
		$pin: String!
	) {
		registerSocialMedia(
			type: $type
			email: $email
			firstName: $firstName
			lastName: $lastName
			profilePicture: $profilePicture
			dateOfBirth: $dateOfBirth
			phone: $phone
			token: $token
			pin: $pin
		)
	}
`;

const USER_CONFIRM_CODE = gql`
	mutation UserConfirmCode($code: String!) {
		confirmCode(code: $code)
	}
`;

const USER_COMPLETE_REGISTRATION = gql`
	mutation UserCompleteRegistration(
		$firstName: String!
		$lastName: String!
		$dateOfBirth: DateTime!
		$pinCode: String!
	) {
		completeRegistration(
			firstName: $firstName
			lastName: $lastName
			dateOfBirth: $dateOfBirth
			pinCode: $pinCode
		) {
			token
		}
	}
`;

const CHECK_SOCIAL_USER_EXIST = gql`
	mutation CheckUserExistsSocialMedia($token: String!) {
		checkUserExistsSocialMedia(token: $token)
	}
`;

const REHYDRATE_TOKEN = gql`
	mutation RehydrateToken($code: String!) {
		rehydratePincode(code: $code)
	}
`;

export const useLoginMutation = () => {
	return useMutation<
		{ login: IGraphqlTypes.IUser },
		IGraphqlTypes.ILoginOnMutationArguments
	>(USER_LOGIN);
};

export const useSignUpMutation = () => {
	return useMutation<
		{ register: IGraphqlTypes.IUser },
		IGraphqlTypes.IRegisterOnMutationArguments
	>(USER_SIGNUP);
};

export const useLoginSocialMediaMutation = () => {
	return useMutation<
		{ loginSocialMedia: string },
		IGraphqlTypes.ILoginSocialMediaOnMutationArguments
	>(USER_LOGIN_SOCIAL_MEDIA);
};

export const useRegisterSocialMediaMutation = () => {
	return useMutation<
		{ registerSocialMedia: boolean },
		IGraphqlTypes.IRegisterSocialMediaOnMutationArguments
	>(USER_REGISTER_SOCIAL_MEDIA);
};

export const useConfirmCode = () => {
	return useMutation<
		{ confirmCode: string },
		IGraphqlTypes.IConfirmCodeOnMutationArguments
	>(USER_CONFIRM_CODE);
};

export const useCompleteRegistration = () => {
	return useMutation<
		{ completeRegistration: IGraphqlTypes.IUser },
		IGraphqlTypes.ICompleteRegistrationOnMutationArguments
	>(USER_COMPLETE_REGISTRATION);
};

export const useCheckUserExistsSocialMedia = () => {
	return useMutation<
		{ checkUserExistsSocialMedia: boolean },
		IGraphqlTypes.ICheckUserExistsSocialMediaOnMutationArguments
	>(CHECK_SOCIAL_USER_EXIST);
};

export const useRehydrateToken = () => {
	return useMutation<
		{ rehydratePincode: string },
		IGraphqlTypes.IRehydratePincodeOnMutationArguments
	>(REHYDRATE_TOKEN);
};
