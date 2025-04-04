import { FormDataType } from "@/app/(auth)/types/form.zod";
import { client } from "@/server/rpc/api.client";
import { ErrorResponse, SuccessResponse } from "@/server/types/api.res.types";
import { useMutation } from "@tanstack/react-query";

export function useSignUpMutation() {
  const {
    isPending,
    mutateAsync,
    data: resData,
  } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: FormDataType) => {
      try {
        const apiRes = await client.Auth.signup.$post(data);
        console.log(apiRes);
        if (apiRes.ok) {
          const resData = (await apiRes.json()) as SuccessResponse;
          console.log(resData);
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

export function useSignInMutation() {
  const {
    isPending,
    mutateAsync,
    data: resData,
  } = useMutation({
    mutationKey: ["signin"],
    mutationFn: async (data: FormDataType) => {
      try {
        const apiRes = await client.Auth.signin.$post(data);
        if (apiRes.ok) {
          const resData = (await apiRes.json()) as SuccessResponse;
          console.log(resData);
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

export function useSignOutMutation() {
  const {
    isPending,
    mutateAsync,
    data: resData,
  } = useMutation({
    mutationKey: ["signout"],
    mutationFn: async () => {
      try {
        const apiRes = await client.Auth.signout.$post();
        if (apiRes.ok) {
          const resData = (await apiRes.json()) as SuccessResponse;
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
