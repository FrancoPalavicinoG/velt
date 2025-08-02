import api from './axios'; 
import {
    saveTokens,            
    updateAccessToken,     
    clearTokens 
} from '@/app/auth/tokens';

function authError(err) {
    if (err.response?.status === 401) {
        const msg = err.response.data?.error ?? 'invalid credentials';
        const e = new Error(msg);
        e.code = 'INVALID_CREDENTIALS';
        throw e;
    }
    if (err.response?.status === 409) {
        const msg = err.response?.data?.error
        if (msg === 'password too weak') {
            const e = new Error(err.response.data?.error ?? 'password too weak');
            e.code  = 'PASSWORD_WEAK';
            throw e;
        } else {
            const e = new Error(err.response.data?.error ?? 'email already exists');
            e.code  = 'EMAIL_EXISTS';
            throw e;
        }
    }
    throw err;
}

/** Endpoints del API backend */
AUTH_ROUTES = {
    REGISTER: '/auth/register',
    LOGIN:    '/auth/login',
    REFRESH:  '/auth/refresh'
};

/** 1. register : POST /auth/register 
    Registra un nuevo usuario y almacena los JWT en SecureStore.
*/
export async function register(payload) {
    try {
        const { data } = await api.post(AUTH_ROUTES.REGISTER, payload);
        await saveTokens({ access: data.access , refresh: data.refresh });
        return data.user;
    } catch (err) {
        authError(err);
    } 
}

/** 2. login : POST /auth/login 
    Inicia sesión y guarda access + refresh tokens.
*/
export async function login(credentials) {
    try {
        const { data } = await api.post(AUTH_ROUTES.LOGIN, credentials);
        await saveTokens({ access: data.access , refresh: data.refresh });
        return data.user;
    } catch (err) {
        authError(err);
    } 
}

/** 3. refresh : POST /auth/refresh 
   Intercambia refresh-token → nuevo access-token.
*/
export async function refresh() {
    try{
        const { data } = await api.post(AUTH_ROUTES.REFRESH);
        if (data?.access) {
            await updateAccessToken(data.access);
            return data.access;
        }
        return null;   
    } catch(err){
        await clearTokens();
        return null;
    }
}
/** 4. logout, borra tokens */
export async function logout() {
    await clearTokens();
}

