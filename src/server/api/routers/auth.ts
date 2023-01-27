import {
  changePasswordSchema,
  signUpSchema,
} from "../../../utils/validation/auth";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { hash, verify } from "argon2";

import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const authRouter = createTRPCRouter({
  changePassword: protectedProcedure
    .input(changePasswordSchema)
    .mutation(async ({ input, ctx }) => {
      const { old_password, password } = input;

      const user = await ctx.prisma.user.findFirst({
        where: { id: ctx.session.user.id },
      });

      if (!user)
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });

      const isValidPassword = await verify(user.password, old_password);

      if (!isValidPassword)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect password",
        });

      const hashedPassword = await hash(password);

      await ctx.prisma.user.update({
        data: { password: hashedPassword },
        where: {
          id: user.id,
        },
      });

      return {
        status: 200,
        message: "Password updated successfully",
      };
    }),

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
