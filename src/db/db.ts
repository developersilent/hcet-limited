import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@/env.mjs";
import * as schema from "@/db/schema";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { sessionTable, userTable } from "@/db/schema";

const pgConnection = neon(env.DATABASE_URL);
export const db = drizzle(pgConnection, { schema });

export const DbAdapter = new DrizzlePostgreSQLAdapter(
  db,
  sessionTable,
  userTable,
);
