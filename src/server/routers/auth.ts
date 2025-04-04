import { FormData } from "@/app/(auth)/types/form.zod";
import { db } from "@/db/db";
import { userTable } from "@/db/schema";
import {
  createNewRoute,
  proctedProcedure,
  publicProcedure,
} from "@/server/rpc/init";
import { eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";
import { hash, verify } from "argon2";
import { LuciaInit } from "@/server/lucia/lucia";
import { SuccessResponse } from "@/server/types/api.res.types";

export const authRoutes = createNewRoute({
  signup: publicProcedure.input(FormData).mutation(async ({ c, input }) => {
    console.log(input);
    // input validation
    const zodValidate = FormData.safeParse(input);
    if (!zodValidate.success) {
      throw new HTTPException(401, {
        message: "Invalid input provided.",
      });
    }
    const { password, username } = zodValidate.data;

    // db query for existing user
    const [isUserExist] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username))
      .limit(1);
    if (isUserExist) {
      throw new HTTPException(401, {
        message: "Username is already taken",
      });
    }

    // Hashing password
    const HashedPassword = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      hashLength: 32,
      parallelism: 1,
    });
    if (!HashedPassword) {
      throw new HTTPException(500, {
        message: "Something went worng.",
      });
    }

    // inserting new user in db
    const [newUser] = await db
      .insert(userTable)
      .values({
        password: HashedPassword,
        username,
      })
      .returning({
        id: userTable.id,
        username: userTable.username,
      });
    if (!newUser) {
      throw new HTTPException(500, {
        message: "Faild to create user.",
      });
    }

    // createing session and seting it in client
    const session = await LuciaInit.createSession(newUser.id, {});
    const cookie = LuciaInit.createSessionCookie(session.id);
    c.header("Set-Cookie", cookie.serialize(), { append: true });

    // final response if everyting was success
    return c.json<SuccessResponse>(
      {
        isSuccess: true,
        Message: "User created successfully.",
      },
      201,
    );
  }),
  signin: publicProcedure.input(FormData).mutation(async ({ c, input }) => {
    // input validation
    const zodValidate = FormData.safeParse(input);
    if (!zodValidate.success) {
      throw new HTTPException(401, {
        message: "Invalid input provided.",
      });
    }
    const { password, username } = zodValidate.data;

    // get user from db
    const [isUserExist] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username))
      .limit(1);
    if (!isUserExist) {
      throw new HTTPException(401, {
        message: "Invalid Username or Password",
      });
    }

    // varifying the passowrd
    const validPassword = await verify(isUserExist.password, password);
    if (!validPassword) {
      throw new HTTPException(401, {
        message: "Invalid Username or Password",
      });
    }

    // seting session in to the client
    const session = await LuciaInit.createSession(isUserExist.id, {});
    const cookie = LuciaInit.createSessionCookie(session.id);
    c.header("Set-Cookie", cookie.serialize(), { append: true });

    // final response if everyting was success
    return c.json<SuccessResponse>({
      isSuccess: true,
      Message: "Login successfully.",
    });
  }),
  signout: proctedProcedure.mutation(async ({ c }) => {
    // geting session from hono context
    const session = c.get("session");
    if (!session) {
      throw new HTTPException(403, {
        message: "Unauthrized",
      });
    }

    // invalidating the session
    await LuciaInit.invalidateSession(session.id);

    // createing blank session and seting it in the client
    const blankCookies = LuciaInit.createBlankSessionCookie().serialize();
    c.header("Set-Cookie", blankCookies, { append: true });

    // final response if everyting was success
    return c.json<SuccessResponse>({
      isSuccess: true,
      Message: "Logout successfully.",
    });
  }),
});
