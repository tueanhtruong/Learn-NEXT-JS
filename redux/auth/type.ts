import { UserCredential } from 'firebase/auth';

export interface AuthUser {
  email: string;
  image: string;
  name: string;
  emailPasswordAuthentication?: boolean;
  uid: string;
}
export interface SignUpPayload {
  password: string;
  email: string;
}
export interface ConfirmSignUpPayload {
  userCredential?: UserCredential;
  username?: string;
  code?: string;
}

export interface SignInPayload {
  username: string;
  password: string;
}
