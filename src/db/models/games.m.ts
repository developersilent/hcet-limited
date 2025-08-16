import { pgTable, text, timestamp, decimal } from "drizzle-orm/pg-core";
import { userTable } from "./user.m";

export const gamesTable = pgTable("games", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  game_name: text("game_name").notNull(),
  game_price: decimal("game_price").notNull(),
  game_vid: text("game_vid").notNull(),
  game_img: text("game_img").notNull(),
  game_release_year: text("game_release_year").notNull(),
  game_developer: text("game_developer").notNull(),
  game_platforms: text("game_platforms").notNull(),
  game_rating: decimal("game_rating").notNull(),
  created_at: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
});
