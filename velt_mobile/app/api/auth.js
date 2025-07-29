import api from './axios'; 
import {
    saveTokens,            
    updateAccessToken,     
    clearTokens 
} from '@/app/auth/token';

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
    const { data } = await api.post(AUTH_ROUTES.REGISTER, payload);
    await saveTokens({ access: data.access , refresh: data.refresh });
    return data.user;
}

/** 2. login : POST /auth/login 
    Inicia sesión y guarda access + refresh tokens.
*/
export async function login(credentials) {
    const { data } = await api.post(AUTH_ROUTES.LOGIN, credentials);
    await saveTokens({ access: data.access , refresh: data.refresh });
    return data.user;
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

