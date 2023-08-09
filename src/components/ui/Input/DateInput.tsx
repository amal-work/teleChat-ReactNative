import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
} from 'react-native';
import { useSpring } from 'react-spring';

import { ActionSheet } from '../ActionSheet';
import { Colors } from 'environment';
import { Icon } from '../Icon';
import { Spring } from '../Spring';

import styles from './DateInput.style';

const DEFAULT_LABEL_PROPS = {
	top: 0,
	fontSize: 16,
};

const ANIMATED_LABEL_PROPS = {
	top: -20,
	fontSize: 12,
};

interface Props {
	card?: boolean;
	label: string;
	date: string;
	setDate: (date: string) => void;
	disabled?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
	onIconPress?: () => void;
}

function getLabelAnimation(value: string) {
	let labelProps =
		value.length > 0 ? ANIMATED_LABEL_PROPS : DEFAULT_LABEL_PROPS;

	return useSpring({
		...labelProps,
		color: Colors.gray[6],
		config: { duration: 150 },
	});
}

export const DateInput = React.forwardRef<TouchableOpacity, Props>(
	(
		{
			card,
			label,
			date,
			setDate,
			disabled = false,
			containerStyle,
			onIconPress,
		},
		ref
	) => {
		const [innderDate, setInnerDate] = useState(new Date());
		const [show, setShow] = useState(false);

		function prependZero(monthDate: number) {
			let correctMonthDate = monthDate + 1;
			if (correctMonthDate < 10) {
				return '0' + correctMonthDate;
			} else {
				return correctMonthDate;
			}
		}

		const onChange = (_: Event, selectedDate?: Date) => {
			if (selectedDate && !card) {
				setInnerDate(selectedDate);
				setDate(
					selectedDate.getMonth() +
						1 +
						'/' +
						selectedDate.getDate() +
						'/' +
						selectedDate.getFullYear()
				);
			}
			if (selectedDate && card) {
				setInnerDate(selectedDate);
				let month = prependZero(selectedDate.getUTCMonth());
				let fullYear = selectedDate.getFullYear().toString();
				let twoDigitYear = fullYear.slice(2, 4);
				setDate(month + '/' + twoDigitYear);
			}
		};

		const labelAnimation = getLabelAnimation(date);
		return (
			<View style={containerStyle}>
				<TouchableOpacity
					ref={ref}
					style={[
						show && { borderBottomColor: Colors.green[10] },
						styles.container,
					]}
					onPress={() => setShow((state) => !state)}
					disabled={disabled}
				>
					{label && (
						<Spring.Text style={[styles.label, labelAnimation]}>
							{label}
						</Spring.Text>
					)}
					<Text style={[styles.text, disabled && { color: Colors.gray[6] }]}>
						{date}
					</Text>
					{!card && (
						<View style={styles.arrowDown}>
							<Icon type={(icons) => icons.ChevronDown} size={12} />
						</View>
					)}
					{card && !!date && (
						<TouchableOpacity
							style={[styles.arrowRight, { transform: [{ scaleX: -1 }] }]}
							onPress={onIconPress}
						>
							<Icon type={(icons) => icons.ArrowLeft} />
						</TouchableOpacity>
					)}
				</TouchableOpacity>
				<ActionSheet visible={show} onClose={() => setShow(false)}>
					<DateTimePicker
						value={innderDate}
						display="default"
						onChange={onChange}
					/>
				</ActionSheet>
			</View>
		);
	}
);
