import { DbAdapter } from "@/db/db";
import { env } from "@/env.mjs";
import { Lucia, TimeSpan } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

export const LuciaInit = new Lucia(DbAdapter, {
  sessionCookie: {
    name: "session_auth",
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
  sessionExpiresIn: new TimeSpan(2, "d"),
});

const LuciaSession = cache(async () => {
  const cookie = await cookies();
  const sessionId = cookie.get(LuciaInit.sessionCookieName)?.value ?? null;

  if (!sessionId) return null;

  const { user, session } = await LuciaInit.validateSession(sessionId);
  try {
    const sessionCookie = LuciaInit.createSessionCookie(session?.id as string);
    if (session && session.fresh) {
      cookie.set(
        sessionCookie.name,
        sessionCookie.serialize(),
        sessionCookie.attributes,
      );
    }

    if (!session) {
      const blankCookie = LuciaInit.createBlankSessionCookie();
      cookie.set(
        blankCookie.name,
        blankCookie.serialize(),
        blankCookie.attributes,
      );
    }
    return {
      user,
      session,
    };
  } catch {
    return null;
  }
});

export async function auth() {
  const Session = await LuciaSession();
  return {
    user: Session?.user,
    session: Session?.session,
  };
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(LuciaInit.sessionCookieName)?.value ?? null;

  if (!sessionId) return null;

  const { user, session } = await LuciaInit.validateSession(sessionId);

  if (session && session.fresh) {
    const sessionCookie = LuciaInit.createSessionCookie(session.id);
    cookieStore.set(
      sessionCookie.name,
      sessionCookie.serialize(),
      sessionCookie.attributes,
    );
  } else if (!session) {
    const blankCookie = LuciaInit.createBlankSessionCookie();
    cookieStore.set(
      blankCookie.name,
      blankCookie.serialize(),
      blankCookie.attributes,
    );
  }

  return { user, session };
}
