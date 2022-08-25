// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import Cookies from 'cookies';
import { COOKIE_TYPE } from '@/admin-service/index';

// type Data = {
// 	name: string
// }

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  return new Promise((resolve) => {
    // convert cookies to header Authorization
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get(COOKIE_TYPE._ACCESS_TOKEN);
    if (accessToken) {
      req.headers.authorization = `Bearer ${accessToken}`;
      // don't send cookies to API server
      req.headers.cookie = '';

      const newUrl = req.url?.replace('/api', '');
      req.url = newUrl;

      // console.log('req.url: ', req.url);

      // /api/students
      // https://js-post-api.herokuapp.com/api/students

      proxy.web(req, res, {
        target: process.env.API_URL,
        changeOrigin: true,
        selfHandleResponse: false,
      });

      proxy.once('proxyRes', () => {
        return resolve(true);
      });
    } else return resolve(res.status(401).json({ message: 'Authorization' }));
  });
}
