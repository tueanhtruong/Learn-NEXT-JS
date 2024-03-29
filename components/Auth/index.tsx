import React, { useEffect } from 'react';
import { IRootState } from '@/redux/rootReducer';
import { setAuthenticated, setIsCorrectRoute } from '@/redux/auth/authSlice';
import { AuthUser } from '@/redux/auth/type';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { PATHS, PRIVATE_PATHS } from '@/app-config/paths';
import { api } from '@/redux/rootSaga';
import { getAuth } from 'firebase/auth';
import { NextPage } from 'next';
import { LoadingCommon, View } from '../commons';
import useComponentDidMount from 'hooks/useComponentDidMount';
import { useAuth } from 'hooks';

const Screen: NextPage<Props> = ({
  authUser,
  // isAuthenticated,
  onSetAuthenticated,
  // isCorrectRoute,
  // onSetIsCorrectRoute,
  children,
}) => {
  const router = useRouter();

  const { profile, isValidating } = useAuth();
  const isAuthenticated = !!profile;
  const authCheck = (url: string) => {
    const isAuthPage = url.includes('auth');
    if (isAuthPage && isAuthenticated) {
      return router.push({
        pathname: PATHS.myProfile,
      });
    }
    const isPrivatePage = PRIVATE_PATHS.includes(url);
    if (isPrivatePage && !isAuthenticated) {
      return router.push({
        pathname: PATHS.signIn,
      });
    }
    // if (isValidating && typeof isAuthenticated === 'boolean') return onSetIsCorrectRoute(true);
  };

  // const handleCheckAuthUser = () => {
  //   const auth = getAuth(api.app);
  //   const user = auth.currentUser;
  //   if (user && !authUser) {
  //     onSetAuthenticated({
  //       email: user.email ?? '',
  //       image: user.photoURL ?? '',
  //       name: user.displayName ?? '',
  //       emailPasswordAuthentication: true,
  //       uid: user.uid,
  //     });
  //   } else if (!authUser) onSetAuthenticated(null);
  // };

  // useComponentDidMount(() => {
  //   setTimeout(handleCheckAuthUser, 800);
  // });

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // // on route change start - hide page content by setting authorized to false
    // const hideContent = () => setAuthorized(false);
    // router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      // router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
      // unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // if (isValidating)
  //   return (
  //     <View flexGrow={1} justify="center" align="center" className="my-64">
  //       <LoadingCommon />
  //     </View>
  //   );

  return children;
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    children: any;
  };
const mapStateToProps = (state: IRootState) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  authUser: state.auth.authUser,
  isCorrectRoute: state.auth.isCorrectRoute,
});

const mapDispatchToProps = (dispatch: (_arg0: { payload: any; type: string }) => any) => ({
  onSetAuthenticated: (payload: AuthUser | null) => dispatch(setAuthenticated(payload)),
  onSetIsCorrectRoute: (payload: boolean) => dispatch(setIsCorrectRoute(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
