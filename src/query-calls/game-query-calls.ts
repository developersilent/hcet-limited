// import { SlideData } from "@/components/carousel-game";
import { gameInfoType } from "@/server/routers/games";
import { client } from "@/server/rpc/api.client";
import { ErrorResponse } from "@/server/types/api.res.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useBuyGameMutation() {
  const {
    isPending,
    mutateAsync,
    data: resData,
  } = useMutation({
    mutationKey: ["buy-game"],
    mutationFn: async (data: gameInfoType) => {
      try {
        const apiRes = await client.Games.addGame.$post(data);
        if (apiRes.ok) {
          const resData = await apiRes.json();
          return resData;
        }
        const resData = (await apiRes.json()) as unknown as ErrorResponse;
        return resData;
      } catch (err) {
        return {
          isSuccess: false,
          Message: String(err),
        } as ErrorResponse;
      }
    },
  });
  return { isPending, resData, mutateAsync };
}

export function useGetUserGames() {
  const { isPending, data: resData } = useQuery({
    queryKey: ["get-user-games"],
    queryFn: async () => {
      try {
        const apiRes = await client.Games.getAllGames.$get();
        if (apiRes.ok) {
          const resData = await apiRes.json();
          return resData;
        }
        const resData = (await apiRes.json()) as unknown as ErrorResponse;
        return resData;
      } catch (err) {
        return {
          isSuccess: false,
          Message: String(err),
        } as ErrorResponse;
      }
    },
  });
  return { isPending, resData };
}
