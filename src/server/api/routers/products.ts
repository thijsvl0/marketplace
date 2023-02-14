import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

import { createProductSchema } from "../../../utils/validation/product";

export const productRouter = createTRPCRouter({
  getMyProducts: protectedProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany({
      where: { user: { id: ctx.session.user.id } },
      include: { images: true },
    });

    return {
      products,
    };
  }),
  getProducts: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany({
      include: { images: true },
    });

    return {
      products,
    };
  }),
  createProduct: protectedProcedure
    .input(createProductSchema)
    .mutation(async ({ input, ctx }) => {
      const { title, description, price, images } = input;

      await ctx.prisma.product.create({
        data: {
          title,
          description,
          price,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          images: {
            connect: images.map((image) => ({
              key: image,
            })),
          },
        },
      });

      return {
        status: 200,
        message: "Product created successfully",
      };
    }),
});
