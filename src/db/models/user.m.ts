import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  created_at: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
  updated_at: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
});
