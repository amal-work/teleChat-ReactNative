import { Dimensions } from 'react-native';

const THRESHOLD_HEIGHT_MEDIUM = 812;
const THRESHOLD_HEIGHT = 731;

export function useDimensions() {
	const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

	return {
		screenWidth,
		screenHeight,
		isSmallDevice: screenHeight < THRESHOLD_HEIGHT,
		isMediumDevice: screenHeight < THRESHOLD_HEIGHT_MEDIUM
	};
}
