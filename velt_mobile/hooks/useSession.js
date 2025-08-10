import { useState, useEffect, useCallback } from "react";
import * as sessionApi from '@/app/api/sessions';
import { DateTime } from 'luxon';

export default function useSession(id) {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false); 

    const toView = useCallback((s) => ({
        ...s,
        start_time: DateTime.fromISO(s.start_time).toLocal(),
        end_time:   s.end_time ? DateTime.fromISO(s.end_time).toLocal() : null,
    }), []);
    
    const fetchSession = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
          const s = await sessionApi.get(id);
          setSession(toView(s));
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
    }, [id, toView]);

    useEffect(() => {
        fetchSession();
    }, [fetchSession]);

    const stopSession = useCallback(async () => {
        // Evita ejecutar si no hay sesión cargada o ya hay una petición en curso
        if (!session || saving) {
            return null;
        }

        const prev = session;
        setSession({ ...session, end_time: DateTime.local() });
        setSaving(true);
        setError(null);

        try {
          const s = await sessionApi.update(session.id);
          setSession(toView(s));
          return s;
        } catch (err) {
          setSession(prev);  // rollback si el servidor falla
          setError(err);
          throw err;
        } finally {
          setSaving(false);
        }
    }, [session, saving, toView]);

    return { session, loading, error, saving, refetch: fetchSession, stopSession };
}