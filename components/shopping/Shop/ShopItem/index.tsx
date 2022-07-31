/* eslint-disable security/detect-object-injection */
import { AnimatePresence, motion } from 'framer-motion';
import _ from 'lodash';
import type { NextPage } from 'next';
import { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { addOrderItemAction, setSuccessAddedItemKey } from '../../../../redux/order/orderSlice';
import { OrderItem } from '../../../../redux/order/type';
import { IRootState } from '../../../../redux/rootReducer';
import { Item } from '../../../../redux/shop/type';
import { formatMoney } from '../../../../utils';
import { FileRenderer, Text, View } from '../../../commons';
import OrderField from './OrderField';

const ShopItem: NextPage<Props> = ({
  user,
  item,
  addingKey,
  successAddedKey,
  onAddItemToCart,
  onSetAddedItemSuccessKey,
}) => {
  const { images } = item;
  const [intervalSlide, setIntervalSlide] = useState<any>();
  const [imgIndex, setImgIndex] = useState<number>(0);
  const imageKeys = Object.keys(images);
  const imageRenders = imageKeys.map((key) => (
    <FileRenderer
      url={_.get(images, key)}
      key={`shop-item-image-${key}`}
      imgWidth={300}
      imgHeight={400}
    />
  ));
  const handleSetIndexImg = () => {
    setImgIndex((idx) => (idx < imageKeys.length - 1 ? idx + 1 : 0));
  };

  const handleSetIntervalSlide = () => {
    if (!intervalSlide) setIntervalSlide(setInterval(handleSetIndexImg, 3400));
  };

  const handleClearInterval = () => {
    if (intervalSlide) {
      clearInterval(intervalSlide);
      setIntervalSlide(null);
    }
  };

  const orderSectionKey = useMemo(() => `add-to-cart-section-${item.id}`, []);

  const handleAddToCart = (quantity: number) => {
    onAddItemToCart({
      id: user?.uid || '',
      item: {
        key: item.id || '',
        quantity,
      },
    });
  };
  const loading = addingKey === item.id;

  const selectedKey = imageKeys[imgIndex];

  const isAddedSuccess = successAddedKey === item.id;

  const isShowOrderField = intervalSlide || loading || isAddedSuccess;

  return (
    <View className="cmp-shop-item">
      <View
        className="cmp-shop-item__img"
        onMouseEnter={handleSetIntervalSlide}
        onMouseLeave={handleClearInterval}
      >
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={selectedKey}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 10, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {imageRenders[imgIndex]}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence exitBeforeEnter>
          {isShowOrderField && (
            <motion.div
              key={orderSectionKey}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="cmp-shop-item__img__order"
            >
              <OrderField
                onAdd={handleAddToCart}
                loading={loading}
                onSetSuccess={onSetAddedItemSuccessKey}
                isSuccess={isAddedSuccess}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </View>
      <View className="cmp-best-product mt-16" isRow align="flex-start" justify="space-between">
        <View>
          <Text size={24} className="cmp-best-product__name fw-bold">
            {item.label}
          </Text>
          <Text size={18} className="cmp-best-product__price">
            {formatMoney(`${item.price}`)}
          </Text>
        </View>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    item: Item;
  };
const mapStateToProps = (state: IRootState) => ({
  user: state.auth.authUser,
  addingKey: state.order.addingKey,
  successAddedKey: state.order.successAddedItemKey,
});

const mapDispatchToProps = (dispatch: (_arg0: { payload: any; type: string }) => any) => ({
  onAddItemToCart: (payload: { item: OrderItem; id: string }) =>
    dispatch(addOrderItemAction(payload)),
  onSetAddedItemSuccessKey: (payload: string) => dispatch(setSuccessAddedItemKey(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopItem);
