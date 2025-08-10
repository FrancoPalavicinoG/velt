import { useState, useEffect, useCallback } from "react";
import * as sessionApi from '@/app/api/sessions';
import { DateTime } from 'luxon'; 

export default function useSessions() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const toView = useCallback((s) => ({
        ...s,
        start_time: DateTime.fromISO(s.start_time).toLocal(),
        end_time:   s.end_time ? DateTime.fromISO(s.end_time).toLocal() : null,
    }), []);

    const fetchSessions = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const s = await sessionApi.list();
            setSessions(toView(s));
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