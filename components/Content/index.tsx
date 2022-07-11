import { IRootState } from '../../redux/rootReducer';
import { connect } from 'react-redux';
import { NextPage } from 'next';
import { getConfigurationAdminAction } from '../../redux/configuration/configurationSlice';
import { isEmpty } from '../../validations';
import { useEffect } from 'react';
import { setIsAdminRole } from '../../redux/auth/authSlice';

const Screen: NextPage<Props> = ({
  authUser,
  isAuthenticated,
  adminAccounts,
  onGetAdminConfiguration,
  onSetIsAdminRole,
}) => {
  useEffect(() => {
    if (!isEmpty(adminAccounts)) {
      const adminAccount = adminAccounts.find((acc) => acc.userId === authUser?.uid);
      if (adminAccount) onSetIsAdminRole(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminAccounts]);

  useEffect(() => {
    if (isAuthenticated) {
      if (isEmpty(adminAccounts)) {
        onGetAdminConfiguration();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return null;
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & {};
const mapStateToProps = (state: IRootState) => ({
  loading: state.configuration.loading,
  adminAccounts: state.configuration.admins,
  isAuthenticated: state.auth.isAuthenticated,
  authUser: state.auth.authUser,
});

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({
  onGetAdminConfiguration: () => dispatch(getConfigurationAdminAction()),
  onSetIsAdminRole: (payload: boolean) => dispatch(setIsAdminRole(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
