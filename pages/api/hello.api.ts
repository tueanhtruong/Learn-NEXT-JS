// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { configAWS } from '@/admin-service/index';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // configAWS();
  res.status(200).json({ name: 'John Doe' });
}
