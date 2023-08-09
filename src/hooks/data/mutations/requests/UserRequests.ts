import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const CHANGE_PASSWORD = gql`
	mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
		changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
	}
`;

const FORGOT_PASSWORD = gql`
	mutation ForgotPasswordRequest($phone: String!) {
		forgotPasswordReq(phone: $phone)
	}
`;

const RESET_PASSWORD = gql`
	mutation ResetPassword(
		$phone: String!
		$token: String!
		$newPassword: String!
	) {
		resetPassword(phone: $phone, token: $token, newPassword: $newPassword)
	}
`;

const REQUEST_CONFIRMATION = gql`
	mutation RequestConfimation($phone: String!) {
		requestConfirmation(phone: $phone)
	}
`;

const REGISTER_NOTIFICATION = gql`
	mutation RegisterNotification($os: String!, $token: String!) {
		registerNotification(os: $os, token: $token)
	}
`;

export const useChangePasswordMutation = () => {
	return useMutation<
		{ changePassword: boolean },
		IGraphqlTypes.IChangePasswordOnMutationArguments
	>(CHANGE_PASSWORD);
};

export const useForgotPasswordRequest = () => {
	return useMutation<
		{ forgotPasswordReq: boolean },
		IGraphqlTypes.IForgotPasswordReqOnMutationArguments
	>(FORGOT_PASSWORD);
};

export const useResetPassword = () => {
	return useMutation<
		{ resetPassword: boolean },
		IGraphqlTypes.IResetPasswordOnMutationArguments
	>(RESET_PASSWORD);
};

export const useRequestConfirmation = () => {
	return useMutation<
		{ requestConfirmation: boolean },
		IGraphqlTypes.IRequestConfirmationOnMutationArguments
	>(REQUEST_CONFIRMATION);
};

export const useRegisterNotification = () => {
	return useMutation<
		{ registerNotification: boolean },
		IGraphqlTypes.IRegisterNotificationOnMutationArguments
	>(REGISTER_NOTIFICATION);
};
