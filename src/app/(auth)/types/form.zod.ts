import { z } from "zod";

export const FormData = z.object({
  email: z
    .email({
      message: "Invalid email address",
    })
    .max(100, { message: "Email is too long" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(5, { message: "Password must contain atleast more then 5 charaters" })
    .max(255, { message: "Password is too long" }),
});

export type FormDataType = z.infer<typeof FormData>;
