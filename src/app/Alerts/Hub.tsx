import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { animated, useTransition } from 'react-spring';

import { Icon } from 'components/ui';
import { DEFAULT_ACTIVITY_TIMEOUT, AlertType } from 'consts';
import { Colors } from 'environment';
import { useDimensions } from 'hooks';
import { Alert } from 'types';

import styles from './Hub.style';

const AnimatedView = animated(View);

interface Props {
	items: Alert[];
	filterItems: (uuid: string) => void;
}

interface AnimationProps {
	life?: string;
	opacity?: number;
	height?: number | string;
}

const spring = { tension: 125, friction: 20, precision: 0.1 };

export function Hub({ items, filterItems }: Props) {
	const { screenWidth } = useDimensions();
	const itemMap = useRef(new Map<string, number>()).current;
	const cancelMap = useRef(new Map<string, () => void>()).current;

	const close = (uuid: string) => {
		const cancel = cancelMap.get(uuid);

		if (cancel) {
			cancel();
			cancelMap.delete(uuid);
		}
	};

	const transitions = useTransition(items, ({ uuid }: Alert) => uuid, {
		from: { opacity: 0, height: 0, life: '100%' },
		enter: ({ uuid }: Alert) => async (next: (props: AnimationProps) => void) =>
			next({ opacity: 1, height: itemMap.get(uuid) }),
		leave: (item: Alert) => async (
			next: (props: AnimationProps) => void,
			cancel: () => void
		) => {
			cancelMap.set(item.uuid, cancel);
			await next({ life: '0%' });
			await next({ opacity: 0 });
			await next({ height: 0 });
		},
		onRest: ({ uuid }: Alert) => filterItems(uuid),
		onDestroyed: ({ uuid }: Alert) => {
			const ref = itemMap.get(uuid);
			if (ref) {
				itemMap.delete(uuid);
			}

			const cancel = cancelMap.get(uuid);
			if (cancel) {
				cancelMap.delete(uuid);
			}
		},
		config: ({ timeout }: Alert, state: string) => (props: string) => {
			switch (props) {
				case 'life': {
					return state === 'leave'
						? { duration: timeout ?? DEFAULT_ACTIVITY_TIMEOUT }
						: spring;
				}

				default: {
					return spring;
				}
			}
		}
	});

	return (
		<SafeAreaView style={styles.container}>
			{transitions.map(
				({
					item,
					key,
					props: { life, ...style }
				}: {
					item: Alert;
					key: string;
					props: AnimationProps;
				}) => {
					const alertColor =
						item.type === AlertType.Error ? Colors.red[6] : Colors.blue[4];
					const lifeColor =
						item.type === AlertType.Error ? Colors.red[10] : Colors.blue[5];

					return (
						<TouchableOpacity
							key={key}
							activeOpacity={1}
							onPress={() => close(item.uuid)}>
							<AnimatedView
								type={item.type}
								style={[
									styles.wrapper,
									{ width: screenWidth - 40, backgroundColor: alertColor },
									style
								]}>
								{item.type === AlertType.Error ? (
									<Icon type={({ Error }) => Error} color={Colors.white} />
								) : (
									<Icon type={({ Info }) => Info} color={Colors.white} />
								)}
								<View
									ref={(ref) => {
										if (ref) {
											itemMap.set(item.uuid, item.title ? 80 : 60);
										}
									}}
									style={styles.content}>
									{item.title && <Text style={styles.title}>{item.title}</Text>}
									<Text style={styles.message}>{item.message}</Text>
								</View>
								<AnimatedView
									type={item.type}
									style={[
										styles.life,
										{ right: life, backgroundColor: lifeColor }
									]}
								/>
							</AnimatedView>
						</TouchableOpacity>
					);
				}
			)}
		</SafeAreaView>
	);
}
