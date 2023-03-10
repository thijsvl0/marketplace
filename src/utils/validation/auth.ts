import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUpSchema = signInSchema
  .extend({
    username: z.string().min(4),
    confirm_password: z.string().min(8),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
