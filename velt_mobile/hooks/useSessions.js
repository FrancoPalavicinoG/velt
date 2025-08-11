import { useState, useEffect, useCallback } from "react";
import * as sessionApi from '@/app/api/sessions';
import { DateTime } from 'luxon'; 

export default function useSessions() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSessions = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const s = await sessionApi.list();
            setSessions(s);
        } catch(err) {
            console.warn('[useSessions] list error →', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(()  => {
        fetchSessions();
    }, [fetchSessions]);

    return {
        sessions, 
        loading, 
        error,
        refetch: fetchSessions,
    }
}