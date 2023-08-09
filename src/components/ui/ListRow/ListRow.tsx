import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './ListRow.style';
import { ListRowProps } from './ListRow.types';

interface Props extends ListRowProps {
	confirmationModalComponent?: React.ReactElement;
	iconComponent?: React.ReactElement;
	infoComponent?: React.ReactElement;
	rightIconComponent?: React.ReactElement;
}

export function ListRow({
	confirmationModalComponent,
	iconComponent,
	infoComponent,
	rightIconComponent,
	header,
	description,
	value,
	info,
	disabled = false,
	containerStyle,
	headerTextStyle,
	valueStyle,
	onPress
}: Props) {
	return (
		<>
			<TouchableOpacity
				activeOpacity={0.25}
				disabled={disabled || !onPress}
				style={[styles.container, containerStyle]}
				onPress={onPress}>
				<View style={{ justifyContent: 'center' }}>{iconComponent}</View>
				<View style={styles.row}>
					<View
						style={[
							styles.headerContainer,
							// !!description && styles.textContainer
							{ justifyContent: 'space-between' }
						]}>
						<Text
							style={[
								styles.headerWithoutDescription,
								!!description && styles.header,
								headerTextStyle
							]}>
							{header}
						</Text>
						{!!description && (
							<Text style={styles.description} numberOfLines={1}>
								{description}
							</Text>
						)}
					</View>
				</View>
				<View style={{}}>
					{rightIconComponent ? (
						<View style={{ flex: 1, alignItems: 'flex-end' }}>
							{rightIconComponent}
						</View>
					) : (
						<View
							style={{
								flex: 1,
								alignItems: 'flex-end',
								justifyContent: 'space-between'
							}}>
							<Text style={[styles.value, valueStyle]}>{value}</Text>
							{infoComponent
								? infoComponent
								: !!info && <Text style={styles.info}>{info}</Text>}
						</View>
					)}
				</View>
			</TouchableOpacity>
			{confirmationModalComponent}
		</>
	);
}
