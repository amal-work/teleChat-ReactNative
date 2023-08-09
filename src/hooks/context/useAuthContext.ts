import { useContext } from 'react';
import { AuthContext } from 'consts';

export function useAuthContext() {
	return useContext(AuthContext);
}
