import { IRootState } from '../../redux/rootReducer';
import { connect } from 'react-redux';
import { NextPage } from 'next';
import {
  getAdminProfileAction,
  getConfigurationAdminAction,
} from '../../redux/configuration/configurationSlice';
import { isEmpty } from '../../validations';
import { useEffect } from 'react';
import { setIsAdminRole } from '../../redux/auth/authSlice';
import { getMyProfileAction } from '../../redux/profile/profileSlice';

const Screen: NextPage<Props> = ({
  authUser,
  isAuthenticated,
  adminAccounts,
  myProfile,
  adminProfile,
  onGetAdminConfiguration,
  onSetIsAdminRole,
  onGetMyProfile,
  onGetMyAdminProfile,
}) => {
  // useEffect(() => {
  //   if (!isEmpty(adminAccounts)) {
  //     const adminAccount = adminAccounts.find((acc) => acc.userId === authUser?.uid);
  //     if (adminAccount) onSetIsAdminRole(true);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [adminAccounts]);
  useEffect(() => {
    if (isEmpty(adminProfile)) {
      onSetIsAdminRole(false);
    } else {
      onSetIsAdminRole(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminProfile]);
  useEffect(() => {
    if (isEmpty(myProfile) && authUser) onGetMyProfile({ uid: authUser.uid });
    if (authUser) onGetMyAdminProfile({ uid: authUser.uid });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  // useEffect(() => {
  // if (isAuthenticated) {
  // if (isEmpty(adminAccounts)) {
  //   onGetAdminConfiguration();
  // }
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAuthenticated]);

  return null;
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & {};
const mapStateToProps = (state: IRootState) => ({
  loading: state.configuration.loading,
  adminAccounts: state.configuration.admins,
  isAuthenticated: state.auth.isAuthenticated,
  authUser: state.auth.authUser,
  myProfile: state.profile.myProfile,
  adminProfile: state.configuration.adminProfile,
});

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({
  onGetAdminConfiguration: () => dispatch(getConfigurationAdminAction()),
  onGetMyAdminProfile: (payload: { uid: string }) => dispatch(getAdminProfileAction(payload)),
  onSetIsAdminRole: (payload: boolean) => dispatch(setIsAdminRole(payload)),
  onGetMyProfile: (payload: { uid: string }) => dispatch(getMyProfileAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
