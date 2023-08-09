import React, { useState, useEffect } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { DropdownItem } from './DropdownItem';
import { FilterableDropdownMenu } from './FilterableDropdownMenu';

import { DropdownItemProps } from './Dropdown.types';

interface DropdownState<TItem> {
	open: boolean;
	selected?: TItem;
	onOpen: () => void;
}

interface Props<TItem> {
	data: TItem[];
	filterField: keyof TItem;
	title: string;
	toggleComponent: (state: DropdownState<TItem>) => React.ReactElement;
	renderItem: (item: TItem) => React.ReactElement<DropdownItemProps<TItem>>;
	keyExtractor: (item: TItem, index: number) => string;
}

export function FilterableDropdown<TItem>({
	data,
	renderItem,
	keyExtractor,
	filterField,
	title,
	toggleComponent
}: Props<TItem>) {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<TItem | undefined>(data[0]);
	const [filteredData, setFilteredData] = useState<TItem[]>(data);
	const [filterValue, changeFilterValue] = useState('');

	useEffect(() => {
		let nextData = data;

		if (filterValue) {
			nextData = data.filter((item: TItem) => {
				const value = item[filterField];

				if (typeof value !== 'string') {
					console.warn(
						`Value of filtering field should be a string, get ${typeof value} instead. Please, check filterField function `
					);
					return false;
				}

				return value.includes(filterValue);
			});
		}

		setFilteredData(nextData);
	}, [data, filterField, filterValue]);

	function handleClose() {
		setOpen(false);
	}

	function handleOpen() {
		if (!open) {
			setOpen(true);
		}
	}

	const renderListItem = ({ item, index }: ListRenderItemInfo<TItem>) => {
		const childElement = renderItem(item);
		return React.cloneElement(childElement, {
			last: index === data.length - 1,
			onClose: handleClose,
			onSelect: (selection: TItem) => {
				setSelected(selection);
				childElement.props.onSelect && childElement.props.onSelect(selection);
			}
		});
	};

	return (
		<>
			{toggleComponent({
				open,
				selected,
				onOpen: handleOpen
			})}
			<FilterableDropdownMenu
				title={title}
				open={open}
				onClose={handleClose}
				filterValue={filterValue}
				onFilterChange={changeFilterValue}>
				<FlatList
					data={filteredData}
					renderItem={renderListItem}
					keyExtractor={keyExtractor}
				/>
			</FilterableDropdownMenu>
		</>
	);
}

FilterableDropdown.Item = DropdownItem;
