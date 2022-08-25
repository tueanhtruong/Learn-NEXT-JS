import { authApi } from 'admin-service';
import { useState } from 'react';
import { SignInPayload } from 'redux/auth/type';
import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';

// Auth --> Protected Pages
// <Auth>{children}</Auth>
export function useAuth(options?: Partial<PublicConfiguration>) {
  const {
    data: profile,
    error,
    mutate,
    isValidating,
  } = useSWR('/me', {
    dedupingInterval: 3600 * 1000, // 1hr
    revalidateOnFocus: false,
    ...options,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const firstLoading = profile === undefined && error === undefined;

  async function login(payload: SignInPayload) {
    setLoading(true);
    await authApi.login(payload);
    setLoading(false);
    await mutate();
  }

  async function logout() {
    setLoading(true);
    await authApi.logout();
    setLoading(false);
    mutate(null, false);
  }

  return {
    profile,
    error,
    login,
    logout,
    firstLoading,
    isValidating: isValidating || loading,
  };
}
