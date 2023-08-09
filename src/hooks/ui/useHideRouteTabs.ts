import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
	useNavigation,
	ParamListBase,
	useRoute,
	RouteProp
} from '@react-navigation/native';

export function useHideRouteTabs() {
	const navigation = useNavigation<BottomTabNavigationProp<ParamListBase>>();
	const route = useRoute<RouteProp<ParamListBase, ''>>();

	// @ts-ignore
	if (route.state && route.state.index > 0) {
		navigation.setOptions({ tabBarVisible: false });
	} else {
		navigation.setOptions({ tabBarVisible: true });
	}
}
