import { NextApiRequest, NextApiResponse } from "next";

interface Data {
    text: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json({ text: 'Hello' })
}
  