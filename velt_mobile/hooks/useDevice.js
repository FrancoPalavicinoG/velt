import { useState, useEffect, useCallback } from "react";
import * as deviceApi from '@/app/api/devices';

export default function useDevice(id) {
    const [device, setDevice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false); // Para el PATCH.

    /** fetchDevice: función “memorizada” con useCallback:
    Sólo cambia si cambia id.
    Evita recrear la función en cada render (bueno para useEffect deps).
    */
    const fetchDevice = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const d = await deviceApi.get(id);
            setDevice(d);
        } catch(err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [id]);

    /**
    patchDevice(updates)
    updates es un objeto parcial ej. { alias: 'New name' }
    Aplica Optimistic UI:
    1. Guarda snapshot (currentState)
    2. setDevice(optimistic) → UI instantánea
    3. Llama a la API
    4a. Ok: setDevice(respuesta real)
    4b. Ko: rollback a snapshot
    */
    const patchDevice = useCallback(async (updates) => {
        if (!device) {
            return null;
        }
        const currentState = device;
        const optimistic = { ...device, ...updates };
        setDevice(optimistic);
        setSaving(true);

        try {
            const d = await deviceApi.update(id, updates);
            setDevice(d);
        } catch (err){
            setDevice(currentState);
            throw err;
        } finally {
            setSaving(false);
        }
    }, [id, device]);

    useEffect(() => {
        fetchDevice();
    }, [fetchDevice]);

    return {
        device, 
        loading, 
        error, 
        saving,
        refetch: fetchDevice,
        patchDevice,
    };
}