import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { animated, useSpring } from 'react-spring';

import { useDimensions, useMemoOnce } from 'hooks';

const AnimatedView = animated(View);

interface Props {
	children: React.ReactNode;
	active?: boolean;
	index?: number;
	activeSlide?: number;
	changeSlide?: () => void;
}

export function Slide({
	children,
	active = false,
	index = 0,
	activeSlide = 0,
	changeSlide
}: Props) {
	const { screenWidth } = useDimensions();

	const bounds = useMemoOnce(() => {
		return { left: -screenWidth, center: 0, right: screenWidth };
	});

	useEffect(() => {
		if (active && index !== activeSlide && changeSlide) {
			changeSlide();
		}
	}, [active, activeSlide, changeSlide, index]);

	const { opacity, translateX } = useSpring({
		opacity: active ? 1 : 0,
		translateX:
			activeSlide === index
				? bounds.center
				: activeSlide < index
				? bounds.right
				: bounds.left,
		config: { duration: 300 }
	});

	return (
		<AnimatedView
			style={[styles.container, { opacity, transform: [{ translateX }] }]}>
			{children}
		</AnimatedView>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		flex: 1,
		height: '100%',
		width: '100%'
	}
});
