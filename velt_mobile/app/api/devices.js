import { RotateOutUpLeft } from 'react-native-reanimated';
import api from './axios'

const DEVICE_ROUTES = {
    CREATE : '/devices',
    LIST : '/devices',
    GET_ONE : '/devices/${id}',
    UPDATE : '/devices/${id}',
    DELETE : '/devices/${id}',
};

/** Crea un device, para emparejar un sensor. */
export async function create(payload) {
    const { data } = await api.post(DEVICE_ROUTES.CREATE, payload);
    return data;
}

/** Lista todos los dispositivos de un usuario logeado. */
export async function list() {
    const { data } = await api.get(DEVICE_ROUTES.LIST);
    return data;
}

/** Devuelve un dispositvo por device_id. */
export async function get(device_id) {
    const { data } = await api.get(DEVICE_ROUTES.GET_ONE(device_id));
    return data;
}