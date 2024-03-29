import type { NextPage } from 'next';
import { connect } from 'react-redux';
import { useComponentDidMount } from '@/hooks';

import { hideModal, showModal } from '@/redux/modal/modalSlice';
import { ModalData } from '@/redux/modal/type';
import { IRootState } from '@/redux/rootReducer';
import { deleteShopItemAction, getShopItemsAction, setSelectedItem } from '@/redux/shop/shopSlice';
import { Item } from '@/redux/shop/type';
import { TableParams } from '@/redux/type';
import { isEmpty } from '@/validations';
import { Grid, LoadingCommon, View } from '../../commons';
import ShopItem from './ShopItem';

const Shop: NextPage<Props> = ({ loading, items, onGetShopProducts }) => {
  useComponentDidMount(() => {
    if (isEmpty(items)) onGetShopProducts({ order: 'asc', sort: 'price' });
  });

  return (
    <Grid.Wrap>
      <Grid.Item variant="is-full">
        <View isRow align="center">
          <h4>Showing:</h4>
          {loading ? (
            <LoadingCommon className="ml-32" />
          ) : (
            <h4 className="ml-8">{items.length} results</h4>
          )}
        </View>
      </Grid.Item>
      {/* <View isRow align="center" justify="space-between" className="mt-32"> */}
      {items.map((item, idx) => (
        <Grid.Item key={`shop-item-${idx}`} variant="is-one-third" className="mt-32">
          <ShopItem item={item} key={`shop-item-${idx}`} />
        </Grid.Item>
      ))}
      {/* </View> */}
    </Grid.Wrap>
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
  onDeleteShopItem: (payload: { id: string }) => dispatch(deleteShopItemAction(payload)),
  onHideModal: () => dispatch(hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
