import { useState, useEffect, useCallback } from "react";
import * as deviceApi from '@/app/api/devices';

export default function useDevices() {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /** Funcion que llama a GET /devices.
    useCallback memoriza la referencia para que no se recree en cada render.
    */
    const fetchDevices = useCallback(async () => {
        setLoading(true); // Activa spinner
        setError(null);

        try {
            const list = await deviceApi.list();
            setDevices(list);
        } catch(err) {
            console.warn('[useDevices] error →', err);
            setError(err);
        } finally {
            setLoading(false);
        }        
    }, []);

    /** Se ejecuta SOLO al “mount” del componente que use este hook.
    Dispara la primera carga automáticamente.   
    */
    useEffect(() => {
        fetchDevices();
    }, [fetchDevices]);

    /** Lo que el hook exporta.
    Cualquier componente que lo consuma recibe un objeto con las 4 propiedades.
    */
    return {
        devices, 
        loading,
        error,
        refetch: fetchDevices,
    };
}