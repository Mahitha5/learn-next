import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string,
    content: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).redirect('/')
}
