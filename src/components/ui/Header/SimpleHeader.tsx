import React from 'react';

import { BaseHeader } from './BaseHeader';
import { BaseHeaderProps } from './BaseHeader.types';

export function SimpleHeader(props: BaseHeaderProps) {
	return <BaseHeader {...props} />;
}
