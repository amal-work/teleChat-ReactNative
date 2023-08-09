import React from 'react';

interface AuthContextType {
	logged: boolean;
	login: (login: boolean) => void;
}

export const AuthContext = React.createContext<AuthContextType>({
	logged: true,
	login: () => {},
});
