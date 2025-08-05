import { useState } from "react";
import * as deviceApi from '@/app/api/devices';

export default function usePairDevice() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /** Empareja (crea) un nuevo dispositivo enviando
    POST /devices con el alias proporcionado.
    */
    const pair = async (alias, hardware_id) => {
        setLoading(true);
        setError(null);

        try {
            await deviceApi.create({ alias, hardware_id });
            return true; //Resuelve promise con true;
        } catch(err){
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        pair,
        loading, 
        error,
    };
}

