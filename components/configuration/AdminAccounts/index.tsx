import { MUIDataTableOptions } from 'mui-datatables';
import type { NextPage } from 'next';
import { useMemo } from 'react';
import { connect } from 'react-redux';
import { getConfigurationAdminAction } from '../../../redux/configuration/configurationSlice';
import { showModal } from '../../../redux/modal/modalSlice';
import { ModalData, MODAL_TYPES } from '../../../redux/modal/type';
import { getSystemUsersAction } from '../../../redux/profile/profileSlice';
import { IRootState } from '../../../redux/rootReducer';
import { TableParams } from '../../../redux/type';
import { Table, View } from '../../commons';
import AccountDetail from './AccountDetail';
import { allColumns } from './allColumns';

const Configuration: NextPage<Props> = ({
  user,
  loading,
  adminAccounts,
  userProfiles,
  onGetSystemUsers,
  onGetConfigurationAdmins,
  onShowModal,
}) => {
  // useComponentDidMount(() => {
  //   if (isEmpty(userProfiles)) onGetSystemUsers({});
  // });
  const handleGetUsers = (params: TableParams) => {
    onGetSystemUsers(params);
  };
  const handleRowClick = (_value: any, meta: { rowIndex: number }) => {
    const index = meta.rowIndex;
    // eslint-disable-next-line security/detect-object-injection
    const selectedRecord = userProfiles[index];
    onShowModal({
      type: MODAL_TYPES.CONTENT_MODAL,
      data: {
        title: 'Account Detail',
        content: <AccountDetail data={selectedRecord} />,
      },
    });
  };
  const tableOptions: MUIDataTableOptions = useMemo(
    () => ({
      count: userProfiles.length,
      filter: false,
      searchAlwaysOpen: false,
      search: false,
      onRowClick: handleRowClick,
      customFooter: () => {
        return null;
      },
    }),
    // eslint-disable-next-line
    [userProfiles]
  );
  const columns = useMemo(
    () => allColumns(),
    // eslint-disable-next-line
    []
  );
  return (
    <View className="section-container">
      <h3>Account Management</h3>
      <Table
        title={''}
        onAction={handleGetUsers}
        isLoading={loading}
        data={userProfiles}
        tableOptions={tableOptions}
        columns={columns}
      />
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const mapStateToProps = (state: IRootState) => ({
  loading: state.profile.loading,
  user: state.auth.authUser,
  adminAccounts: state.configuration.admins,
  userProfiles: state.profile.userProfiles,
});

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({
  onGetConfigurationAdmins: (payload: TableParams | null) =>
    dispatch(getConfigurationAdminAction(payload)),
  onGetSystemUsers: (payload: TableParams) => dispatch(getSystemUsersAction(payload)),
  onShowModal: (payload: { data: ModalData; type: string }) => dispatch(showModal(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);
