import React, { useState } from 'react';

import { BaseDropdownProps } from './Dropdown.types';
import { DropdownMenu } from './DropdownMenu';

interface DropdownState<TItem> {
	open: boolean;
	selected?: TItem;
	onOpen: () => void;
}

interface Props<TItem> extends BaseDropdownProps<TItem> {
	initialSelect?: TItem;
	toggleComponent: (state: DropdownState<TItem>) => React.ReactElement;
}

export function Dropdown<TItem>({
	children,
	title,
	initialSelect,
	toggleComponent
}: Props<TItem>) {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<TItem | undefined>(initialSelect);

	function handleClose() {
		setOpen(false);
	}

	function handleOpen() {
		if (!open) {
			setOpen(true);
		}
	}

	function handleSelect(item: TItem) {
		setSelected(item);
	}

	const enhancedChildren = React.Children.map(children, (child, index) =>
		React.cloneElement(child, {
			last: index === React.Children.count(children) - 1,
			onClose: handleClose,
			onSelect: (item: TItem) => {
				handleSelect(item);
				child.props.onSelect && child.props.onSelect(item);
			}
		})
	);

	return (
		<>
			{toggleComponent({
				open,
				selected,
				onOpen: handleOpen
			})}
			<DropdownMenu title={title} open={open} onClose={handleClose}>
				{enhancedChildren}
			</DropdownMenu>
		</>
	);
}
