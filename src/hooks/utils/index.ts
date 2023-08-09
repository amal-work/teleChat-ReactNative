import { useCallback, useEffect, useMemo, useRef } from 'react';

export function useCallbackOnce(callback: (...args: any[]) => any) {
	return useCallback(callback, []);
}

export function useEffectOnce(effect: React.EffectCallback) {
	useEffect(effect, []);
}

export function useMemoOnce<T>(factory: () => T) {
	return useMemo<T>(factory, []);
}

export function usePrevious<T>(value: T): T | undefined {
	const ref = useRef<T>();
	useEffect(() => void (ref.current = value), [value]);

	return ref.current;
}
