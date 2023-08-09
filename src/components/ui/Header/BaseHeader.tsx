import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import { ProgressBar } from './ProgressBar';
import { Icon } from '../Icon';
import { Tabs } from '../Tabs';
import { Colors } from 'environment';

import styles from './Header.style';
import { BaseHeaderProps } from './BaseHeader.types';

export function BaseHeader({
	title,
	description,
	leftComponent,
	leftAlign = false,
	rightComponent,
	from,
	to,
	icon,
	iconSize,
	children,
	labelContainerStyle,
	transparent,
	whiteContent
}: BaseHeaderProps) {
	return (
		<>
			<SafeAreaView
				style={[
					styles.container,
					!children && !transparent && styles.border,
					transparent && { backgroundColor: Colors.transparent }
				]}>
				<ProgressBar from={from} to={to} whiteContent={whiteContent} />
				<View style={styles.row}>
					{leftComponent}
					<View
						style={[
							styles.titleContainer,
							leftAlign && { alignItems: 'flex-start' }
						]}>
						{icon && title ? (
							<View style={{ flexDirection: 'row' }}>
								<Icon
									type={icon}
									size={iconSize}
									color={whiteContent ? Colors.white : Colors.gray[4]}
									style={{ alignSelf: 'center' }}
								/>
								{description ? (
									<View style={{ marginLeft: 8 }}>
										<Text
											style={[
												styles.title,
												whiteContent && { color: Colors.white }
											]}>
											{title}
										</Text>
										<Text
											style={[
												styles.description,
												whiteContent && { color: Colors.white }
											]}>
											{description}
										</Text>
									</View>
								) : (
									<Text
										style={[
											styles.title,
											{ marginLeft: 8 },
											whiteContent && { color: Colors.white }
										]}>
										{title}
									</Text>
								)}
							</View>
						) : icon ? (
							<Icon
								type={icon}
								size={iconSize}
								color={whiteContent ? Colors.white : Colors.gray[4]}
							/>
						) : (
							<Text
								style={[styles.title, whiteContent && { color: Colors.white }]}>
								{title}
							</Text>
						)}
					</View>
					{leftComponent && !rightComponent && <View style={{ flex: 1 }} />}
					{rightComponent}
				</View>
			</SafeAreaView>
			{children && (
				<Tabs labelContainerStyle={labelContainerStyle}>{children}</Tabs>
			)}
		</>
	);
}
// <>
// 	<SafeAreaView
// 		style={[
// 			styles.container,
// 			!children && !transparent && styles.border,
// 			transparent && { backgroundColor: Colors.transparent },
// 		]}
// 	>
// 		<ProgressBar from={from} to={to} whiteContent={whiteContent} />
// 		<View style={styles.row}>
// 			{!!userPhoto && (
// 				<Icon src={userPhoto} style={{ marginRight: 8 }} size={35} />
// 			)}
// 			{back && (
// 				<TouchableOpacity
// 					activeOpacity={0.5}
// 					style={{ flex: 1 }}
// 					onPress={handleBack}
// 				>
// 					<Icon
// 						type={(icons) => icons.ArrowLeft}
// 						size={24}
// 						color={whiteContent ? Colors.white : Colors.gray[4]}
// 					/>
// 				</TouchableOpacity>
// 			)}
// 			<View
// 				style={[
// 					styles.titleContainer,
// 					leftAlign && { alignItems: 'flex-start' },
// 				]}
// 			>
// 				{icon ? (
// 					<Icon
// 						type={icon}
// 						size={iconSize}
// 						color={whiteContent ? Colors.white : Colors.gray[4]}
// 					/>
// 				) : (
// 					<Text
// 						style={[styles.title, whiteContent && { color: Colors.white }]}
// 					>
// 						{title}
// 					</Text>
// 				)}
// 			</View>
// 			{back && !rightIcon && !time && <View style={{ flex: 1 }} />}
// 			{rightIcon && (
// 				<View style={[styles.actionContainer, { alignItems: 'flex-end' }]}>
// 					<TouchableOpacity activeOpacity={0.5} onPress={onRightIconPress}>
// 						<Icon
// 							type={rightIcon}
// 							size={rightIconSize}
// 							color={whiteContent ? Colors.white : Colors.green[10]}
// 						/>
// 					</TouchableOpacity>
// 				</View>
// 			)}
// 			{time && (
// 				<View style={[styles.actionContainer, { alignItems: 'flex-end' }]}>
// 					<Text style={styles.time}>{timer.toLocaleTimeString()}</Text>
// 				</View>
// 			)}
// 		</View>
// 	</SafeAreaView>
// 	{search && <View>{search}</View>}
// 	{children && (
// 		<Tabs labelContainerStyle={labelContainerStyle}>{children}</Tabs>
// 	)}
// </>

// Header.Tab = Tab;
