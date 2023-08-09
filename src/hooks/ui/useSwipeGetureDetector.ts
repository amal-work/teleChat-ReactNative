import React, { useRef } from 'react';
import {
	PanResponder,
	PanResponderGestureState,
	GestureResponderEvent,
	LayoutChangeEvent
} from 'react-native';

import { SwipeDirection } from 'consts';

interface ComponentDimensions {
	width: number | null;
	height: number | null;
}

interface SwipeCallbacks {
	ignoreDirection: SwipeDirection;
	onSwipeRight?: () => void;
	onSwipeLeft?: () => void;
	onSwipeUp?: () => void;
	onSwipeDown?: () => void;
}

export function useSwipeGestureHandlers({
	ignoreDirection = SwipeDirection.vertical,
	onSwipeRight = () => {},
	onSwipeLeft = () => {},
	onSwipeUp = () => {},
	onSwipeDown = () => {}
}: SwipeCallbacks) {
	const componentDimensions = useRef<ComponentDimensions>({
		width: null,
		height: null
	});

	const _getSwipeDirection = (
		gestureState: PanResponderGestureState
	): SwipeDirection => {
		const { dy, dx, vy, vx } = gestureState;
		if (Math.abs(dy) > Math.abs(dx * 3) && Math.abs(vy) > Math.abs(vx * 3)) {
			return SwipeDirection.vertical;
		} else if (
			Math.abs(dx) > Math.abs(dy * 3) &&
			Math.abs(vx) > Math.abs(vy * 3)
		) {
			return SwipeDirection.horizontal;
		} else {
			return SwipeDirection.none;
		}
	};

	const gestureFinishHandler = (
		_: GestureResponderEvent,
		gestureState: PanResponderGestureState
	) => {
		const { width, height } = componentDimensions.current;

		const swipeDirection = _getSwipeDirection(gestureState);
		const { dx, dy } = gestureState;
		const isSwipeBigEnough =
			swipeDirection === SwipeDirection.horizontal
				? Math.abs(dx) > (width || 1) * 0.2
				: Math.abs(dy) > (height || 1) * 0.2;

		if (swipeDirection === SwipeDirection.horizontal && isSwipeBigEnough) {
			dx > 0 ? onSwipeLeft() : onSwipeRight();
		} else if (swipeDirection === SwipeDirection.vertical && isSwipeBigEnough) {
			dy > 0 ? onSwipeUp() : onSwipeDown();
		}
	};

	const panResponder = React.useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => false,
			onStartShouldSetPanResponderCapture: () => false,
			onMoveShouldSetPanResponderCapture: () => false,
			onMoveShouldSetPanResponder: (_, gestureState) => {
				const direction = _getSwipeDirection(gestureState);
				return (
					direction !== ignoreDirection && direction !== SwipeDirection.none
				);
			},
			onPanResponderTerminationRequest: () => true,
			onShouldBlockNativeResponder: () => true,
			// handler
			onPanResponderRelease: gestureFinishHandler
		})
	).current;

	const onLayout = (e: LayoutChangeEvent) => {
		const { width, height } = e.nativeEvent.layout;
		componentDimensions.current = { width, height };
	};

	return {
		onLayout,
		...panResponder.panHandlers
	};
}
