import { jstack } from "jstack";
import { LuciaInit } from "@/server/lucia/lucia";
import { Env } from "hono";
import { Session, User } from "lucia";

interface Jenv extends Env {
  Variables: {
    user: User | null;
    session: Session | null;
  };
}
export const j = jstack.init<Jenv>();

const validateRes = j.middleware(async ({ c, next }) => {
  const sessionId = LuciaInit.readSessionCookie(c.req.header("Cookie") ?? "");
  if (!sessionId) {
    c.set("user", null);
    c.set("session", null);
    await next();
  }
  const { session, user } = await LuciaInit.validateSession(
    sessionId as string,
  );
  if (session && session.fresh) {
    const cookie = LuciaInit.createSessionCookie(session.id).serialize();
    c.header("Set-Cookie", cookie, { append: true });
  }
  if (!session) {
    const blankCookie = LuciaInit.createBlankSessionCookie().serialize();
    c.header("Set-Cookie", blankCookie, { append: true });
  }
  c.set("session", session);
  c.set("user", user);
  await next();
});

export const createNewRoute = j.router;
export const publicProcedure = j.procedure;
export const proctedProcedure = j.procedure.use(validateRes);
