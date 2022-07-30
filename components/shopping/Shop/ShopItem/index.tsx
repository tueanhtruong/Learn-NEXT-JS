/* eslint-disable security/detect-object-injection */
import { AnimatePresence, motion } from 'framer-motion';
import _ from 'lodash';
import type { NextPage } from 'next';
import { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../../../redux/rootReducer';
import { Item } from '../../../../redux/shop/type';
import { FileRenderer, Text, View } from '../../../commons';
import OrderField from './OrderField';

const ShopItem: NextPage<Props> = ({ user, item }) => {
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
    if (!intervalSlide) setIntervalSlide(setInterval(handleSetIndexImg, 2400));
  };

  const handleClearInterval = () => {
    if (intervalSlide) {
      clearInterval(intervalSlide);
      setIntervalSlide(null);
    }
  };

  const orderSectionKey = useMemo(() => `add-to-cart-section-${item.id}`, []);

  const selectedKey = imageKeys[imgIndex];
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
            // whileHover={{  }}
          >
            {imageRenders[imgIndex]}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence exitBeforeEnter>
          {intervalSlide && (
            <motion.div
              key={orderSectionKey}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="cmp-shop-item__img__order"
            >
              <OrderField />
            </motion.div>
          )}
        </AnimatePresence>
      </View>
      <View className="cmp-best-product mt-32" isRow align="flex-start" justify="space-between">
        <View>
          <Text size={24} className="cmp-best-product__name fw-bold">
            {item.label}
          </Text>
          <Text size={18} className="cmp-best-product__price">
            {item.price} đ
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
});

const mapDispatchToProps = (_dispatch: (_arg0: { payload: any; type: string }) => any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ShopItem);
