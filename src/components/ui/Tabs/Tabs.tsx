import React, { useCallback, useRef, useState } from 'react';
import {
	ScrollView,
	LayoutChangeEvent,
	View,
	StyleProp,
	ViewStyle,
} from 'react-native';
import { useSpring } from 'react-spring';

import { useDimensions } from 'hooks';
import { TabProps } from 'types';

import { Tab } from './Tab';
import { TabContent } from './TabContent';
import { Spring } from '../Spring';
import styles from './Tabs.style';

interface Props {
	children: React.ReactElement<TabProps>[];
	indicatorStyle?: StyleProp<ViewStyle>;
	tabContentContainerStyle?: StyleProp<ViewStyle>;
	labelContainerStyle?: StyleProp<ViewStyle>;
	currencyBalanceTab?: boolean;
}

export function Tabs({
	labelContainerStyle,
	tabContentContainerStyle,
	currencyBalanceTab = false,
	children
}: Props) {
	const [activeTab, setActiveTab] = useState(0);
	const [firstSegmentWidth, setFirstSegmentWidth] = useState(0);

	const { isSmallDevice } = useDimensions();

	const segmentWidths: number[] = useRef([0]).current;
	const segmentXs: number[] = useRef([0]).current;

	const changeTab = (index: number) => {
		setActiveTab(index);
	};

	const handleTabMeasure = useCallback(
		(e: LayoutChangeEvent, index: number) => {
			const {
				nativeEvent: {
					layout: { width, x }
				}
			} = e;

			if (index === 0 && !firstSegmentWidth) {
				setFirstSegmentWidth(width);
			}

			if (!segmentWidths[index]) {
				segmentWidths[index] = width;
			}

			if (!segmentXs[index]) {
				segmentXs[index] = x;
			}
		},
		[firstSegmentWidth, segmentWidths, segmentXs]
	);

	const enhancedChildren = React.Children.map(children, (child, index) =>
		React.cloneElement(child, {
			active: activeTab === index,
			last: index === React.Children.count(children) - 1,
			onMeasure: (event: LayoutChangeEvent) => handleTabMeasure(event, index),
			onTabChange: () => changeTab(index),
			containerStyle:
				(currencyBalanceTab && styles.tabContainer) ||
				(labelContainerStyle && labelContainerStyle)
		})
	);

	const animation = useSpring({
		width: segmentWidths[activeTab] ?? firstSegmentWidth,
		left: segmentXs[activeTab],
		config: { duration: 250 }
	});
	return (
		<View style={[styles.container, currencyBalanceTab && { height: isSmallDevice ? 120 : 150 }]}>
			{currencyBalanceTab && <View style={{ flex: isSmallDevice ? 15 : 7 }}>
				{enhancedChildren.map((child, index) => (
					<TabContent
						key={`${child.props.label}-tab-content`}
						activeTab={activeTab}
						index={index}
					>
						{child.props.children}
					</TabContent>
				))}
			</View>}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={[
					
					currencyBalanceTab ? styles.currencyBalanceScroll: styles.scroll,
					isSmallDevice && { paddingBottom: 2 }
				]}
				style={!currencyBalanceTab && styles.border}
			>
				{enhancedChildren}
				<Spring.View style={[ currencyBalanceTab ? styles.currencyBalanceIndicator : styles.indicator, animation]} />
			</ScrollView>
			{!currencyBalanceTab && <View style={[styles.content, tabContentContainerStyle]}>
				{enhancedChildren.map((child, index) => (
					<TabContent
						key={`${child.props.label}-tab-content`}
						activeTab={activeTab}
						index={index}
					>
						{child.props.children}
					</TabContent>
				))}
			</View>}
		</View>
	);
}

Tabs.Tab = Tab;
