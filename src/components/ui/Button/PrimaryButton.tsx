import React from 'react';

import { Colors } from 'environment';
import { BaseButton, ButtonProps } from './BaseButton';

export function PrimaryButton(props: ButtonProps) {
	return (
		<BaseButton
			{...props}
			backgroundColor={Colors.blue[6]}
			disabledColor={Colors.blue[3]}
		/>
	);
}
