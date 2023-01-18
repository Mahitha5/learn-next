import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

type ResponseObj = {
    message: string
}

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseObj>
) {
    await prisma.user.create({
        data: {
            email: req.body.email,
            firstName: req.body.firstname,
            lastName: req.body.lastname
        }
    })
    res.status(200).redirect('/')
}
