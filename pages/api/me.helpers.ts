import { COOKIE_TYPE } from '@/admin-service/index';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
  [key: string]: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'GET') {
    return res.status(404).json({ message: 'method not supported' });
  }

  // return new Promise((resolve, reject) => {
  try {
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get(COOKIE_TYPE._ACCESS_TOKEN);

    const cognito = new CognitoIdentityServiceProvider();
    const { UserAttributes }: GetUserResponse = await cognito
      .getUser({
        AccessToken: accessToken || '',
      })
      .promise();

    const userProsResponse = UserAttributes.reduce((state, item) => {
      const { Name, Value = '' } = item;
      const newState = { ...state, [Name]: Value };
      return newState;
    }, {});

    return res.status(200).json({ message: 'successfully', ...userProsResponse });
  } catch (err) {
    console.log('err: ', err);
    return res.status(500).json({ message: 'Wrong process' });
  }
}
