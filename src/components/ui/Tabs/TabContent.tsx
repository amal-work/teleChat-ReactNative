import React from 'react';
import { useSpring } from 'react-spring';

import { useDimensions } from 'hooks';
import { Spring } from '../Spring';

import styles from './TabContent.style';

interface Props {
	children: React.ReactElement;
	activeTab: number;
	index: number;
}

export function TabContent({ children, activeTab, index }: Props) {
	const { screenWidth } = useDimensions();

	const bounds = { left: -screenWidth, center: 0, right: screenWidth };
	const animation = useSpring({
		opacity: activeTab === index ? 1 : 0,
		left:
			activeTab === index
				? bounds.center
				: activeTab < index
				? bounds.right * (index + 1)
				: bounds.left * (index + 1),
		config: { duration: 300 }
	});

	return (
		<Spring.View style={[styles.container, animation]}>{children}</Spring.View>
	);
}
