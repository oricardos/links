
import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react';

import { getToken, saveToken, removeToken } from '@/services/token';

interface AuthContextData {
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signIn: (token: string) => Promise<void>;
    signOut: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadStoredToken() {
            try {
                const storedToken = await getToken();
                setToken(storedToken);
            } catch (error) {
                console.error('Erro ao recuperar token:', error);
            } finally {
                setIsLoading(false);
            }
        }

        loadStoredToken();
    }, []);

    async function signIn(newToken: string) {
        await saveToken(newToken);
        setToken(newToken);
    }

    async function signOut() {
        await removeToken();
        setToken(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated: !!token,
                isLoading,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
