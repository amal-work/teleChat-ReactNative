import React from 'react';
import { BaseHeaderProps } from './BaseHeader.types';
import { BaseHeader } from './BaseHeader';
import { ProfilePictureName } from '../Profile';

export function HeaderProfile(props: BaseHeaderProps) {
	return (
		<BaseHeader
			{...props}
			leftComponent={
				<ProfilePictureName
					profilePicture={props.profilePicture}
					name={props.name || ''}
					header
				/>
			}
		/>
	);
}
