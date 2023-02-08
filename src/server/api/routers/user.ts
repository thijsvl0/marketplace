import {
  changeAvatarScheme,
  changePasswordSchema,
  getUploadUrlSchema,
} from "../../../utils/validation/user";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { hash, verify } from "argon2";

import { TRPCError } from "@trpc/server";
import { s3 } from "../../../lib/aws";
import { v4 as uuidv4 } from "uuid";

export const userRouter = createTRPCRouter({
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
  changeAvatar: protectedProcedure
    .input(changeAvatarScheme)
    .mutation(async ({ input, ctx }) => {
      const { avatar } = input;

      await ctx.prisma.user.update({
        data: { avatar: { connect: { key: avatar } } },
        where: {
          id: ctx.session.user.id,
        },
      });

      return {
        status: 200,
        message: "Avatar updated successfully",
      };
    }),
  getMe: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: { id: ctx.session.user.id },
      include: { avatar: true },
    });

    if (!user)
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });

    return {
      user,
    };
  }),
  getUploadUrl: protectedProcedure
    .input(getUploadUrlSchema)
    .mutation(async ({ input, ctx }) => {
      const { type } = input;

      const fileName = `${uuidv4()}.${type}`;

      const key = `static/${fileName}`;

      const presignedUrl = s3.getSignedUrl("putObject", {
        Bucket: process.env.AWS_BUCKET,
        Key: key,
        Expires: 100,
      });

      const image = await ctx.prisma.image.create({
        data: { key, user: { connect: { id: ctx.session.user.id } } },
      });

      return {
        url: presignedUrl,
        ...image,
      };
    }),
});
