import { get } from 'lodash';
import { useContext } from 'react';

import { LanguageContext } from './useLanguage';
import { Dictionary } from 'environment';

export function useTranslation() {
	const { translations } = useContext(LanguageContext);

	function translate(getKey: (dict: typeof Dictionary) => string) {
		const key = getKey(Dictionary);
		const translation = get(translations, key);
		return translation;
	}

	return translate;
}
