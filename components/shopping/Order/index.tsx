import type { NextPage } from 'next';
import { connect } from 'react-redux';
import { useComponentDidMount } from '@/hooks';

import { hideModal, showModal } from '@/redux/modal/modalSlice';
import { ModalData } from '@/redux/modal/type';
import { getOrderItemsAction } from '@/redux/order/orderSlice';
import { IRootState } from '@/redux/rootReducer';
import { isEmpty } from '@/validations';
import { Grid, LoadingCommon, View } from '../../commons';

const Shop: NextPage<Props> = ({ user, loading, orders, onGetMyOrders }) => {
  useComponentDidMount(() => {
    if (isEmpty(orders) && user) onGetMyOrders({ id: user.uid });
  });

  return (
    <Grid.Wrap>
      <Grid.Item variant="is-full">
        <View isRow align="center">
          <h4>Have:</h4>
          {loading ? (
            <LoadingCommon className="ml-32" />
          ) : (
            <h4 className="ml-8">{orders.length} orders</h4>
          )}
        </View>
      </Grid.Item>
    </Grid.Wrap>
  );
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const mapStateToProps = (state: IRootState) => ({
  loading: state.order.loading,
  user: state.auth.authUser,
  orders: state.order.orders,
});

const mapDispatchToProps = (dispatch: (_arg0: { payload: any; type: string }) => any) => ({
  onGetMyOrders: (payload: { id: string }) => dispatch(getOrderItemsAction(payload)),
  onShowModal: (payload: { data: ModalData; type: string }) => dispatch(showModal(payload)),
  onHideModal: () => dispatch(hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
