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
    if (req.method === 'POST') {
        await prisma.user.create({
            data: {
                email: req.body.email,
                firstName: req.body.firstname,
                lastName: req.body.lastname
            }
        })
        res.status(200).redirect('/')
    }
    if (req.method === 'PUT') {
        const reqBody = JSON.parse(req.body)
        await prisma.user.update({
            where: {
                email: reqBody.email
            },
            data: {
                firstName: reqBody.firstName,
                lastName: reqBody.lastName
            }
        })
        res.status(200).json({ message: 'Updated successfully' })
    }
}
