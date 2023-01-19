/**
 * This file contains the root router of your tRPC-backend
 */
import { router } from '../trpc';

export const appRouter = router({

});

export type AppRouter = typeof appRouter;