import { COOKIE_TYPE } from '@/admin-service/index';
import appConfig from '@/app-config/index';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { InitiateAuthResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';

import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
  [key: string]: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'PUT') {
    return res.status(404).json({ message: 'method not supported' });
  }

  try {
    const cookies = new Cookies(req, res);
    const refreshToken = cookies.get(COOKIE_TYPE._REFRESH_TOKEN);

    const cognito = new CognitoIdentityServiceProvider();
    const userRefresh: InitiateAuthResponse = await cognito
      .initiateAuth({
        AuthFlow: 'REFRESH_TOKEN',
        ClientId: appConfig.AWS_CONFIG.userPoolWebClientId || '',
        AuthParameters: {
          REFRESH_TOKEN: refreshToken || '',
        },
      })
      .promise();
    const accessToken = userRefresh.AuthenticationResult?.IdToken;
    cookies.set(COOKIE_TYPE._ACCESS_TOKEN, accessToken);

    return res.status(200).json({ message: 'successfully' });
  } catch (err) {
    console.log('err: ', err);
    return res.status(500).json({ message: 'Wrong process' });
    // reject(true);
  }
  // });
}
