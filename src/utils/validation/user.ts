import * as z from "zod";

export const changePasswordSchema = z
  .object({
    old_password: z.string().min(8),
    password: z.string().min(8),
    confirm_password: z.string().min(8),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
export const changeAvatarScheme = z.object({
  avatar: z.string(),
});
export const getUploadUrlSchema = z.object({
  type: z.string(),
});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
export type ChangeAvatarScheme = z.infer<typeof changeAvatarScheme>;
export type GetUploadUrlSchema = z.infer<typeof getUploadUrlSchema>;
