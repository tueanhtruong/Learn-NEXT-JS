import { SignInPayload } from '@/redux/auth/type';
import axiosClient from './axios-client';

export const authApi = {
  login(payload: SignInPayload) {
    return axiosClient.post('/login', payload);
  },

  logout() {
    return axiosClient.post('/logout');
  },

  getProfile() {
    return axiosClient.get('/me');
  },
};
