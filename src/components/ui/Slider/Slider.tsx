import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';

import { Slide } from './Slide';

interface Props {
	children: React.ReactNode;
}

export function Slider({ children }: Props) {
	const [activeSlide, setActiveSlide] = useState(0);
	const changeSlide = (index: number) => setActiveSlide(index);

	const enhancedChildren = React.Children.map(children, (child, index) =>
		React.cloneElement(child as JSX.Element, {
			index,
			activeSlide,
			changeSlide: () => changeSlide(index)
		})
	);

	return <SafeAreaView style={{ flex: 1 }}>{enhancedChildren}</SafeAreaView>;
}

Slider.Slide = Slide;
