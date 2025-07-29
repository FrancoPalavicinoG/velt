import axios from 'axios';

import { API_BASE, REQUEST_TIME } from '@/app/config'; 
import {
    getAccessToken,
    updateAcccessToken,
    clearTokens
} from '@/app/auth/token';

import { refresh } from './auth'

/** Instancia Axios base. */
const api = axios.create({
    baseURL: API_BASE,
    timeout: REQUEST_TIME
});

/** Interceptor de requests */
api.interceptors.request.use(async config => {
    const access = await getAccessToken();
    if (access) {
        config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
});

/** Interceptor de response */
api.interceptors.response.use(
    response => response,

    async error => {
        const { response, config } = error;

        /** Si el servidor devuelve 401 significa "token inválido o expirado".
            Implementamos refresh automático SOLO una vez por petición. */
        if (response?.status === 401 && !config._retry) {
            config._retry = true;

            try {
                /** Solicitamos un nuevo access-token con el refresh-token actual */
                const newAccess = await refresh();
                /** Si la llamada es exitosa, guardamos el nuevo token */
                if (newAccess) {
                    await updateAcccessToken(newAccess);
                    /** Reintentamos la peticion origanl con el nuevo token */
                    config.headers.Authorization = `Bearer ${newAccess}`;
                    return api(config);
                }
            } catch (refreshErr) {
                /** Si el refresh falla limpiamos tokens*/
                await clearTokens();
            }
        }
        /** Si NO es 401 o ya re-intentamos y sigue fallando, reenviamos  */
        throw error;
    } 
);

export default api;