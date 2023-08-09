import React, { useState } from 'react';
import { View } from 'react-native';

import { ConfirmReceiver, Icon } from 'components/ui';
import { Colors } from 'environment';

import { ListRow } from './ListRow';
import styles from './ListRow.style';
import { IconProps, ListRowProps } from './ListRow.types';

enum Transaction {
	Deposit = 'Deposit',
	Withdraw = 'Withdraw',
	Sent = 'Sent',
	Receive = 'Receive'
}

function getTransactionColor(type: Transaction) {
	if (type === Transaction.Deposit || type === Transaction.Receive) {
		return Colors.green[10];
	}

	if (type === Transaction.Withdraw || type === Transaction.Sent) {
		return Colors.red[10];
	}
}

interface Props extends IconProps, ListRowProps {
	transaction?: (types: typeof Transaction) => Transaction;
	description: string;
	onTransactionConfirm?: () => void;
}

export function TransactionListRow({
	description,
	disabled,
	header,
	icon,
	iconBackground,
	rightIcon,
	transaction = () => Transaction.Deposit,
	value,
	onPress,
	onTransactionConfirm,
	...props
}: Props) {
	const [showModal, setShowModal] = useState(false);

	function handleShowModal() {
		setShowModal(true);
	}

	const type = transaction(Transaction);
	const color = getTransactionColor(type);

	const isPositive =
		type === Transaction.Deposit || type === Transaction.Receive;
	const isNegative = type === Transaction.Withdraw || type === Transaction.Sent;

	return (
		<>
			<ListRow
				{...props}
				header={header}
				description={description}
				disabled={disabled && !onPress && !type}
				confirmationModalComponent={
					<ConfirmReceiver
						name={header}
						id={description}
						currency='usd'
						open={showModal}
						value='2000'
						onClose={() => setShowModal(false)}
						onPressButton={onTransactionConfirm}
					/>
				}
				iconComponent={
					<>
						{iconBackground ? (
							<View style={styles.iconContainer}>
								<View
									style={[styles.iconBackground, { backgroundColor: color }]}
								/>
								<Icon type={icon} size={23} style={styles.icon} color={color} />
							</View>
						) : (
							<Icon type={icon} size={45} />
						)}
					</>
				}
				rightIconComponent={
					rightIcon && (
						<Icon type={rightIcon} size={16} color={Colors.gray[4]} />
					)
				}
				value={isNegative ? `-${value}` : isPositive ? `+${value}` : value}
				valueStyle={{ color }}
				onPress={onTransactionConfirm ? handleShowModal : onPress}
			/>
		</>
	);
}
