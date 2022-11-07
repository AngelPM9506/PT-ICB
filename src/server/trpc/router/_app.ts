import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { productosRouter } from "./productos";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  productos: productosRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
