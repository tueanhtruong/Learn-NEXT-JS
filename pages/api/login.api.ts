// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import dayjs from 'dayjs';
import { COOKIE_TYPE } from '@/admin-service/index';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
// import '@/admin-service/index';

type Data = {
  message: string;
  [key: string]: any;
};

// export const config = {
//   api: {
//     bodyParser: true,
//   },
// };

// const proxy = httpProxy.createProxyServer();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'method not supported' });
  }
  try {
    // req.headers.cookie = '';

    const { username, password } = req.body;

    await Auth.signIn(username, password);
    const session: CognitoUserSession = await Auth.currentSession();
    // const sessionToken = signInResponse.getSignInUserSession();
    const accessToken = session?.getIdToken().getJwtToken();
    const refreshToken = session?.getRefreshToken().getToken();
    // const userName = await signInResponse?.getUsername();
    const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' });
    const expiredAt = dayjs().add(1, 'hours').toDate();
    // cookies.set('refresh_token');
    cookies.set(COOKIE_TYPE._ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      expires: expiredAt,
    });
    cookies.set(COOKIE_TYPE._REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      expires: expiredAt,
    });
    // cookies.set(COOKIE_TYPE._USER, JSON.stringify(signInResponse), {
    //   httpOnly: true,
    //   sameSite: 'lax',
    //   expires: expiredAt,
    // });

    return res.status(200).json({ message: 'Login Success' });
  } catch (err: any) {
    console.log('err: ', err);
    return res.status(500).json({ message: 'Something went wrong!', ...err });
  }

  // return new Promise((resolve) => {
  //   // don't send cookies to API server

  //   // const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
  //   //   let body = '';
  //   //   proxyRes.on('data', function (chunk) {
  //   //     body += chunk;
  //   //   });

  //   //   proxyRes.on('end', function () {
  //   //     try {
  //   //       const { accessToken, expiredAt, ...restBody } = JSON.parse(body);
  //   //       console.log('accessToken, expiredAt, ...restBody: ', accessToken, expiredAt, restBody);

  //   //       // convert token to cookies
  //   //       const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' });
  //   //       cookies.set('access_token', accessToken, {
  //   //         httpOnly: true,
  //   //         sameSite: 'lax',
  //   //         expires: new Date(expiredAt),
  //   //       });
  //   //       (res as NextApiResponse).status(200).json({ message: 'login successfully' });
  //   //     } catch (error) {
  //   //       (res as NextApiResponse).status(500).json({ message: 'something went wrong' });
  //   //     }

  //   //     resolve(true);
  //   //   });
  //   // };

  //   // proxy.once('proxyRes', handleLoginResponse);
  //   // proxy.web(req, res, {
  //   //   target: process.env.API_URL,
  //   //   changeOrigin: true,
  //   //   selfHandleResponse: true,
  //   // });
  // });
}
