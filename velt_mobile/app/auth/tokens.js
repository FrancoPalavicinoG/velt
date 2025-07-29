import * as SecureStore from 'expo-secure-store';
import { TOKEN_KEY, REFRESH_KEY } from '@/app/config';

/**
  Metodos para trabajar pares key-value en SecureStore.
  Key: Nombre de la casilla (TOKEN_KEY o REFRESH_KEY)
  Value: Valor a persistir (JWT)
*/

/** Guarda un par key–value en SecureStore. */
async function _set(key, value) {
    if (!value) return;
    await SecureStore.setItemAsync(key, value, {
        keychainAccessible: SecureStore.ALWAYS,
    });
}

/** Lee el contenido de una casilla. Devuelve null si no existe. */
function _get(key) {
    return SecureStore.getItemAsync(key);
}

/** Elimina una casilla de SecureStore. */
function _delete(key) {
    return SecureStore.deleteItemAsync(key);
}

/**
  Metodos exportables para trabajar con la API de AUTH 
*/

export async function saveTokens({access, refresh}) {
    await Promise.all([
        _set(TOKEN_KEY, access),
        _set(REFRESH_KEY, refresh),
    ]);
}

export async function getAccessToken() {
    return _get(TOKEN_KEY)
}

export async function getRefreshToken() {
    return _get(REFRESH_KEY)
}

/** Sustituye SOLO el access-token tras un refresh exitoso. */
export async function updateAcccessToken(newToken) {
    await _set(TOKEN_KEY, newToken);
}

/** Borra ambos tokens (logout). */
export async function clearTokens() {
    await Promise.all([
        _delete(TOKEN_KEY),
        _delete(REFRESH_KEY),
    ]);
}



