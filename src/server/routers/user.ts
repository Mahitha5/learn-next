import { router, procedure } from '../trpc'
import {PrismaClient} from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient()

console.log("in user router")
export const userRouter = router({
    all: procedure.query(async () => {
            const users = await prisma.user.findMany()

            return {
                users
            }
        })
})