import React, {
    createContext,   // crea el contenedor de datos globales
    useState,        // gestiona estado interno (user)
    useEffect,       // side-effects: cargar tokens guardados al arrancar
    useContext,      // consumir el contexto con un custom hook
    useCallback,     // memorizar funciones (evita recrearlas en cada render)
} from 'react';

// Wrappers HTTP que envían peticiones a tu backend
import {
    login as apiLogin,
    signup as apiSignup,
    logout as apiLogout,
} from '@/app/api/auth';

// Helpers de SecureStore para leer/escribir tokens
import {
    getAccessToken, 
    clearTokens,
} from './tokens';

// Context que tendra un objeto con valores por defecto.
const AuthCtx = createContext({
    user: null,
    login: () => Promise.resolve(),
    signup: () => Promise.resolve(),
    logout: () => Promise.resolve(),
});

// Hook que permitira const { user } = useAuth(). En lugar de const { user } = useContext(AuthCtx)
export const useAuth = () => useContext(AuthCtx);

/** 1. Provider */
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    /** 1.1 Comprobar si existe access-token persistido */
    useEffect(() => {
        (async () => {
            const token = await getAccessToken();
            if (token) {
                setUser({});
            }
        })();
    }, []);

    const login = useCallback(async (credentials) => {
        await apiLogin(credentials);
        setUser({});
    }, []);

    const signup = useCallback(async (credentials) => {
        await apiSignup(credentials);
        setUser({});
    }, []);

    const logout = useCallback(async () => {
        try { await apiLogout(); } catch {}
        await clearTokens();
        setUser(null);
    }, []);

    return (
        <AuthCtx.Provider value={{ user, login, signup, logout }}>
            { children }
        </AuthCtx.Provider>
    );
}

