import { useMemo } from 'react';
import {
	compareDesc,
	differenceInCalendarWeeks,
	differenceInMonths,
	differenceInYears,
	subWeeks
} from 'date-fns';

type Transaction = IGraphqlTypes.IVaultTransaction;

interface SectionData {
	title: string;
	data: Transaction[];
}

export function useTransactionHistoryListData(
	data: Transaction[]
): SectionData[] {
	const sectionizedList: SectionData[] = useMemo(() => {
		if (data.length) {
			const sortedTransactions = data.sort(
				(prevTx: Transaction, nextTx: Transaction) => {
					return compareDesc(
						new Date(prevTx.createdAt),
						new Date(nextTx.createdAt)
					);
				}
			);
			return generateSectionListData(sortedTransactions);
		}

		return [];
	}, [data]);

	return sectionizedList;
}

function generateSectionListData(transactions: Transaction[]): SectionData[] {
	const today = new Date();

	let weekPosition = -1;
	let prevWeekDiff: number | null = null;

	return transactions.reduce<SectionData[]>((acc, transaction) => {
		const txDate = new Date(transaction.createdAt);
		const weekDiff = differenceInCalendarWeeks(today, txDate);

		if (prevWeekDiff === null || prevWeekDiff !== weekDiff) {
			prevWeekDiff = weekDiff;
			weekPosition++;
		}

		const prevWeekData = acc[weekPosition]?.data || [];

		acc[weekPosition] = {
			title: getSectionTitle(weekDiff),
			data: [...prevWeekData, transaction]
		};

		return acc;
	}, []);
}

function getSectionTitle(weekDiff: number, today = new Date()) {
	const txDate = subWeeks(today, weekDiff);

	const years = differenceInYears(today, txDate);
	const months = differenceInMonths(today, txDate);

	if (years > 0) {
		return `${years} ${years > 1 ? 'Years' : 'Year'} Ago`;
	}

	if (months > 0) {
		return `${months} ${months > 1 ? 'Months' : 'Month'} Ago`;
	}

	return weekDiff > 1
		? `${weekDiff} Weeks ago`
		: weekDiff === 0
		? 'This Week'
		: 'Last Week';
}
