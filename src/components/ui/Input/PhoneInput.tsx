import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';

import { Input, InputProps } from './Input';
// import { PhoneCodeDropdown } from 'components/features/phoneCode/PhoneCodeDropdown';

import { usePrevious } from 'hooks';
import { CountyDataList } from 'consts';

interface Props extends InputProps {
	prefixComponent?: never;
}

export const PhoneInput = React.forwardRef<TextInput, Props>(
	({ value, onChangeText, ...inputProps }, ref) => {
		const [country, setCountry] = useState<{
			name: string;
			flag: string;
			phoneCode: string;
			code: string;
		}>(CountyDataList[0]);

		const prevValue = usePrevious(country);

		useEffect(() => {
			if (onChangeText) {
				const prevPhoneCode = prevValue?.phoneCode || '';
				const nextValue = value.replace(prevPhoneCode, '');

				onChangeText(`${country.phoneCode}${nextValue}`);
			}

			// eslint:fix adds to dependency array value, and effect starts infinity loop, so I ignore this line
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [country]);

		const phoneChangeHandler = (phone: string) => {
			if (onChangeText) {
				onChangeText(`${country.phoneCode}${phone}`);
			}
		};

		const shownValue = value.replace(country.phoneCode, '');
		return (
			<Input
				ref={ref}
				value={shownValue}
				onChangeText={phoneChangeHandler}
				{...inputProps}
				// prefixComponent={<PhoneCodeDropdown onSelect={setCountry} />}
			/>
		);
	}
);
