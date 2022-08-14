import { MUIDataTableOptions } from 'mui-datatables';
import type { NextPage } from 'next';
import { useMemo } from 'react';
import { FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';
import {
  getConfigurationBannersAction,
  setSelectedBanner,
} from '@/redux/configuration/configurationSlice';
import { Banner } from '@/redux/configuration/type';
import { showModal } from '@/redux/modal/modalSlice';
import { ModalData, MODAL_TYPES } from '@/redux/modal/type';
import { IRootState } from '@/redux/rootReducer';
import { TableParams } from '@/redux/type';
import { isEmpty } from '@/validations';
import { Button, Table, View } from '../../commons';
import { allColumns } from './allColumns';
import BannerForm from './BannerForm';

const Configuration: NextPage<Props> = ({
  loading,
  banners,
  onGetConfigurationBanners,
  onSetSelectedBanner,
  onShowModal,
}) => {
  const handleGetBanners = (params: TableParams) => {
    onGetConfigurationBanners(params);
  };
  const handleRowClick = (_value: any, meta: { rowIndex: number }) => {
    const index = meta.rowIndex;
    // eslint-disable-next-line security/detect-object-injection
    const selectedRecord = banners[index];
    onSetSelectedBanner(selectedRecord);
    onShowModal({
      type: MODAL_TYPES.CONTENT_MODAL,
      data: {
        title: 'Banner Detail',
        content: <BannerForm />,
      },
    });
  };
  const handleCreateNewBanner = () => {
    onSetSelectedBanner(undefined);
    onShowModal({
      type: MODAL_TYPES.CONTENT_MODAL,
      data: {
        title: 'New Banner',
        content: <BannerForm />,
      },
    });
  };
  const tableOptions: MUIDataTableOptions = useMemo(
    () => ({
      count: banners.length,
      filter: false,
      searchAlwaysOpen: false,
      search: false,
      onRowClick: handleRowClick,
      customFooter: () => {
        return null;
      },
    }),
    // eslint-disable-next-line
    [banners]
  );
  const columns = useMemo(
    () => allColumns(),
    // eslint-disable-next-line
    []
  );
  const isDisabledCreate = isEmpty(banners) || banners.length === 4;
  return (
    <View className="section-container">
      <View isRow justify="space-between">
        <h3>Banner Configuration</h3>
        <Button
          disabled={isDisabledCreate}
          icon={<FaPlus />}
          label="Create A new Banner"
          onClick={handleCreateNewBanner}
        />
      </View>
      <Table
        title={''}
        onAction={handleGetBanners}
        isLoading={loading}
        data={banners}
        defaultSortOrder={{ name: 'order', direction: 'asc' }}
        tableOptions={tableOptions}
        columns={columns}
      />
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const mapStateToProps = (state: IRootState) => ({
  loading: state.configuration.loading,
  user: state.auth.authUser,
  banners: state.configuration.banners,
});

const mapDispatchToProps = (dispatch: (_arg0: { payload: any; type: string }) => any) => ({
  onGetConfigurationBanners: (payload: TableParams) =>
    dispatch(getConfigurationBannersAction(payload)),
  onSetSelectedBanner: (payload: Banner | undefined) => dispatch(setSelectedBanner(payload)),
  onShowModal: (payload: { data: ModalData; type: string }) => dispatch(showModal(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);
