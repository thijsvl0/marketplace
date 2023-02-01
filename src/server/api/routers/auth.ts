import { createTRPCRouter, publicProcedure } from "../trpc";

import { TRPCError } from "@trpc/server";
import { hash } from "argon2";
import { signUpSchema } from "../../../utils/validation/auth";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
      const { username, email, password } = input;

      const exists = await ctx.prisma.user.findFirst({ where: { email } });

      if (exists)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already exists",
        });

      const hashedPassword = await hash(password);

      const user = await ctx.prisma.user.create({
        data: { username, email, password: hashedPassword },
      });

      return {
        status: 201,
        message: "User created successfully",
        result: user.email,
      };
    }),
});
