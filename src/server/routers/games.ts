import { db } from "@/db/db";
import { gamesTable } from "@/db/schema";
import { createNewRoute, proctedProcedure } from "@/server/rpc/init";
import { eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";
import { SuccessResponse } from "@/server/types/api.res.types";
import z from "zod";

type gameinfoType = typeof gamesTable.$inferInsert;

const GameDataZod = z.object({
  title: z.string(),
  price: z.string(),
  bgImg: z.string(),
  src: z.string(),
  rating: z.string(),
  releaseYear: z.string(),
  developer: z.string(),
  platforms: z.string(),
});

export type gameInfoType = z.infer<typeof GameDataZod>;

export const gamesRoutes = createNewRoute({
  addGame: proctedProcedure
    .input(GameDataZod)
    .mutation(async ({ c, input }) => {
      console.log(input);
      // input validation
      const zodValidate = GameDataZod.safeParse(input);
      if (!zodValidate.success) {
        throw new HTTPException(400, {
          message: "Invalid input provided.",
        });
      }

      const userId = c.get("user")?.id;
      if (!userId) {
        throw new HTTPException(401, {
          message: "Unauthorized: User ID is required",
        });
      }

      const gameData = zodValidate.data;

      const gameInfo: Omit<gameinfoType, "id"> = {
        userId: userId,
        game_img: gameData.src,
        game_price: gameData.price,
        game_rating: gameData.rating,
        game_release_year: gameData.releaseYear,
        game_developer: gameData.developer,
        game_platforms: gameData.platforms,
        game_name: gameData.title,
        game_vid: gameData.bgImg,
      };

      // Insert new game in db
      const [newGame] = await db
        .insert(gamesTable)
        .values(gameInfo)
        .returning();

      if (!newGame) {
        throw new HTTPException(500, {
          message: "Failed to add game.",
        });
      }

      // final response if everything was successful
      return c.json<SuccessResponse>(
        {
          isSuccess: true,
          Message: "Game Purchased successfully.",
        },
        201,
      );
    }),

  getAllGames: proctedProcedure.query(async ({ c }) => {
    // geting session from hono context
    const session = c.get("session");
    const user = c.get("user");
    if (!session || !user) {
      throw new HTTPException(403, {
        message: "Unauthrized",
      });
    }

    const userId = user.id;

    const userGames = await db.query.gamesTable.findMany({
      where: eq(gamesTable.userId, userId),
    });
    if (!userGames) {
      throw new HTTPException(404, {
        message: "No games found for this user",
      });
    }

    return c.superjson({
      isSuccess: true,
      Message: "Data found",
      data: userGames,
    });
  }),
});
