"use client";
import { Session } from "lucia";
import { User } from "lucia";
import { useEffect, useState } from "react";

interface SessionData {
  user: User | null;
  session: Session | null;
}

export function useSession() {
  const [sessionData, setSessionData] = useState<SessionData>({
    user: null,
    session: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const response = await fetch("/api/auth/session");
        const data = (await response.json()) as SessionData;
        setSessionData(data);
      } catch {
        setSessionData({ user: null, session: null });
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, []);

  return { ...sessionData, loading };
}
