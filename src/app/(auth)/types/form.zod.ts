import { z } from "zod";

export const FormData = z.object({
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .min(3, { message: "Username is too short" })
    .regex(/^(?=.*[_.])[a-z0-9._]+$/, {
      message: "Use small letters, numbers, _ or . (must have _ or .)",
    })
    .max(100, { message: "Username is too long" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(5, { message: "Password must contain atleast more then 5 charaters" })
    .max(255, { message: "Password is too long" }),
});

export type FormDataType = z.infer<typeof FormData>;
