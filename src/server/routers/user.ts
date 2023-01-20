import {router, procedure} from '../trpc'
import {PrismaClient} from '@prisma/client';
import {z} from 'zod';

const prisma = new PrismaClient()

export const userRouter = router({
    all: procedure.query(async () => {
        const users = await prisma.user.findMany()

        return {
            users
        }
    }),
    add: procedure
        .input(z.object({
            email: z.string(),
            firstName: z.string(),
            lastName: z.string()
        }))
        .mutation(async ({input}) => {
            console.log("im in mutation")
            await prisma.user.create({
                data: {
                    email: input.email,
                    firstName: input.firstName,
                    lastName: input.lastName
                }
            })
            return {
                message: 'Successfully added'
            }
        }),
    update: procedure
        .input(z.object({
            email: z.string(),
            firstName: z.string(),
            lastName: z.string()
        }))
        .mutation(async ({ input }) => {
            await prisma.user.update({
                where: {
                    email: input.email
                },
                data: {
                    firstName: input.firstName,
                    lastName: input.lastName
                }
            })

            return {
                message: "Updated successfully"
            }
        })
})