// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    console.log(req.headers);
    return res.status(200).json({ data: req["headers"]["x-real-ip"] as string})
}
