import { COOKIE_TYPE } from '@/admin-service/index';
import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'method not supported' });
  }

  const cookies = new Cookies(req, res);
  cookies.set(COOKIE_TYPE._ACCESS_TOKEN);
  cookies.set(COOKIE_TYPE._REFRESH_TOKEN);
  cookies.set(COOKIE_TYPE._USER);

  res.status(200).json({ message: 'logout successfully' });
}
