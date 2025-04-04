import { j } from "@/server/rpc/init";
import { authRoutes } from "@/server/routers/auth";
import { Context } from "hono";
import { HTTPResponseError } from "hono/types";
import { HTTPException } from "hono/http-exception";
import { ErrorResponse } from "../types/api.res.types";
import { env } from "@/env.mjs";

type ErrorType = Error | HTTPResponseError;

function GlobalErrorHandler(error: ErrorType, c: Context) {
  if (error instanceof HTTPException) {
    const errorResponse =
      error.res ??
      c.json<ErrorResponse>(
        {
          isSuccess: false,
          Message: error.message,
        },
        error.status,
      );
    return errorResponse;
  }
  return c.json<ErrorResponse>(
    {
      isSuccess: false,
      Message:
        env.NODE_ENV === "production"
          ? "Internal Server Error"
          : (error.stack ?? error.message),
    },
    500,
  );
}

const app = j
  .router()
  .basePath("/api")
  .use(j.defaults.cors)
  .onError(GlobalErrorHandler);

const appRouter = j.mergeRouters(app, {
  Auth: authRoutes,
});

export type AppRouter = typeof appRouter;

export default appRouter;
