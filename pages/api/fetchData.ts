import { NextApiRequest, NextApiResponse } from "next";

interface Data {
    body: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    let url = req.query['url'] as string;

    let data = await fetch(url)
        .then(res => res.json())

    res.status(200).json({ body: JSON.stringify(data) })
}
  