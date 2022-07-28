/* eslint-disable security/detect-object-injection */
import { AnimatePresence, motion } from 'framer-motion';
import _ from 'lodash';
import type { NextPage } from 'next';
import { useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { connect } from 'react-redux';
import { IRootState } from '../../../../redux/rootReducer';
import { Item } from '../../../../redux/shop/type';
import { FileRenderer, Text, View } from '../../../commons';

const ShopItem: NextPage<Props> = ({ user, item }) => {
  const { images } = item;
  // let interval: any;
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
  // useComponentDidMount(() => {
  //   interval = setInterval(handleSetIndexImg, 4500);
  // });

  // useComponentWillUnmount(() => {
  //   clearInterval(interval);
  // });

  const selectedKey = imageKeys[imgIndex];
  // const selectedImage = _.get(images, selectedKey);
  return (
    <View>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={selectedKey}
          initial={{ y: -10, opacity: 0, cursor: 'pointer' }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ boxShadow: '5px 3px 18px -1px rgba(0,0,0,0.75)' }}
          onClick={handleSetIndexImg}
        >
          {imageRenders[imgIndex]}
        </motion.div>
      </AnimatePresence>
      {/* <FileRenderer url={selectedImage} imgWidth={300} imgHeight={440} /> */}
      <View className="cmp-best-product mt-16" isRow align="flex-start" justify="space-between">
        <View>
          <Text size={24} className="cmp-best-product__name fw-bold">
            {item.label}
          </Text>
          <Text size={18} className="cmp-best-product__price">
            {item.price} đ
          </Text>
        </View>
        <View>
          <FaCartPlus size={32} title="Add to Cart" className="pointer" />
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
