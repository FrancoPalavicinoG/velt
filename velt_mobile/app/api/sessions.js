import api from './axios'

const SESSION_ROUTES = {
    CREATE : '/sessions',
    LIST : '/sessions',
    GET_ONE: (id) => `/sessions/${id}`, // Para despues.
    UPDATE : (id) => `/sessions/${id}`,
    DELETE : (id) => `/sessions/${id}`, // Para despues.
};

export async function create() {
    const { data } = await api.post(SESSION_ROUTES.CREATE);
    return data;
}

export async function list() {
    const { data } = await api.get(SESSION_ROUTES.LIST);
    return data;
}

export async function get(session_id) {
    const { data } = await api.get(SESSION_ROUTES.GET_ONE(session_id));
    return data;
}

export async function update(session_id) {
    const { data } = await api.patch(SESSION_ROUTES.UPDATE(session_id));
    return data;
}
