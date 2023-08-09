import { createContext, useContext } from 'react';

import { Dictionary } from 'environment';
import { Nullable } from 'types';

export enum LanguageCode {
	EN = 'en'
}

interface LanguageContext {
	language: LanguageCode;
	translations: Nullable<typeof Dictionary>;
	changeLanguage: (code: LanguageCode) => void;
}

type LanguageTuple = [LanguageCode, (code: LanguageCode) => void];

export const LanguageContext = createContext<LanguageContext>({
	language: LanguageCode.EN,
	translations: null,
	changeLanguage: () => null
});

export function useLanguage(): LanguageTuple {
	const { language, changeLanguage } = useContext(LanguageContext);
	return [language, changeLanguage];
}
