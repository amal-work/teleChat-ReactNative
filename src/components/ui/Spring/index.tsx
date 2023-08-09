import {
	SafeAreaView,
	Text,
	TextProps,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
	ViewProps
} from 'react-native';
import { animated } from 'react-spring';

const AnimatedSafeAreaView: React.ComponentType<ViewProps> = animated(
	SafeAreaView
);
const AnimatedText: React.ComponentType<TextProps> = animated(Text);
const AnimatedTouchableOpacity: React.ComponentType<TouchableOpacityProps> = animated(
	TouchableOpacity
);
const AnimatedView: React.ComponentType<ViewProps> = animated(View);

interface Props {
	children: React.ReactNode;
}

export function Spring({ children }: Props) {
	return <>{children}</>;
}

Spring.SafeAreaView = AnimatedSafeAreaView;
Spring.Text = AnimatedText;
Spring.TouchableOpacity = AnimatedTouchableOpacity;
Spring.View = AnimatedView;
