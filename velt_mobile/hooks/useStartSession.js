import { useState, useCallback } from "react";
import * as sessionApi from '@/app/api/sessions';

export default function useStartSession() {
  const [starting, setStarting] = useState(false);   
  const [startError, setStartError] = useState(null);

  const startSession = useCallback(async () => {
    // Evita doble toque mientras aún está en curso
    if (starting) return null;

    setStarting(true);
    setStartError(null);

    try {
      const session = await sessionApi.create();
      return session; // devolvemos la sesión creada (con id) para navegar al detalle
    } catch (err) {
      console.warn('[useStartSession] error →', err);
      setStartError(err);
      throw err;      // deja que el caller maneje el error
    } finally {
      setStarting(false); 
    }
  }, [starting]);

  return {
    startSession,
    starting,
    startError,
  };
}