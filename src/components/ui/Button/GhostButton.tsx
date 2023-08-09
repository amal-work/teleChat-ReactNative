import React from 'react';

import { BaseButton, ButtonProps } from './BaseButton';
import { Colors } from 'environment';

export function GhostButton(props: ButtonProps) {
	return (
		<BaseButton
			{...props}
			ghost
			backgroundColor={Colors.transparent}
			titleColor={Colors.blue[6]}
			borderColor={Colors.blue[6]}
			disabledColor={Colors.gray[4]}
		/>
	);
}
