import { authRouter } from "./routers/auth";
import { createTRPCRouter } from "./trpc";
import { productRouter } from "./routers/products";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
