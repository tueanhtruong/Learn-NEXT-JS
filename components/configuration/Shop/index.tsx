import { MUIDataTableOptions } from 'mui-datatables';
import type { NextPage } from 'next';
import { useMemo } from 'react';
import { FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';

import { showModal } from '../../../redux/modal/modalSlice';
import { ModalData, MODAL_TYPES } from '../../../redux/modal/type';
import { IRootState } from '../../../redux/rootReducer';
import { getShopItemsAction, setSelectedItem } from '../../../redux/shop/shopSlice';
import { Item } from '../../../redux/shop/type';
import { TableParams } from '../../../redux/type';
import { Button, Table, View } from '../../commons';
import { allColumns } from './allColumns';
import ProductForm from './ShopItem';

const Shop: NextPage<Props> = ({
  loading,
  items,
  onGetShopProducts,
  onSetSelectedProduct,
  onShowModal,
}) => {
  const handleGetProducts = (params: TableParams) => {
    onGetShopProducts(params);
  };
  const handleRowClick = (_value: any, meta: { rowIndex: number }) => {
    const index = meta.rowIndex;
    // eslint-disable-next-line security/detect-object-injection
    const selectedRecord = items[index];
    onSetSelectedProduct(selectedRecord);
    onShowModal({
      type: MODAL_TYPES.CONTENT_MODAL,
      data: {
        title: 'Product Detail',
        content: <ProductForm />,
      },
    });
  };
  const handleCreateNewProduct = () => {
    onSetSelectedProduct(undefined);
    onShowModal({
      type: MODAL_TYPES.CONTENT_MODAL,
      data: {
        title: 'New Product',
        content: <ProductForm />,
      },
    });
  };
  const tableOptions: MUIDataTableOptions = useMemo(
    () => ({
      count: items.length,
      filter: false,
      searchAlwaysOpen: false,
      search: false,
      onRowClick: handleRowClick,
      customFooter: () => {
        return null;
      },
    }),
    // eslint-disable-next-line
    [items]
  );
  const columns = useMemo(
    () => allColumns(),
    // eslint-disable-next-line
    []
  );
  return (
    <View className="section-container">
      <View isRow justify="space-between">
        <h3>Shop Product</h3>
        <Button icon={<FaPlus />} label="Add A new Product" onClick={handleCreateNewProduct} />
      </View>
      <Table
        title={''}
        onAction={handleGetProducts}
        isLoading={loading}
        data={items}
        defaultSortOrder={{ name: 'price', direction: 'asc' }}
        tableOptions={tableOptions}
        columns={columns}
      />
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const mapStateToProps = (state: IRootState) => ({
  loading: state.shop.loading,
  user: state.auth.authUser,
  items: state.shop.items,
});

const mapDispatchToProps = (dispatch: (_arg0: { payload: any; type: string }) => any) => ({
  onGetShopProducts: (payload: TableParams) => dispatch(getShopItemsAction(payload)),
  onSetSelectedProduct: (payload: Item | undefined) => dispatch(setSelectedItem(payload)),
  onShowModal: (payload: { data: ModalData; type: string }) => dispatch(showModal(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
