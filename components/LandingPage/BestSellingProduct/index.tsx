import React, { HTMLProps } from 'react';
import { Button, Text, View } from '../../commons';
import { IMAGES } from '@/app-config/images';
import Image from 'next/image';
// import Footer from 'src/components/Footer';

export type Product = {
  image: keyof typeof IMAGES;
  caption: string;
  price: string;
};

const BestSellingProduct: React.FC<Props> = ({ product, idx }) => {
  return (
    <View className="cmp-best-product">
      <Text size={100} className="cmp-best-product__index">
        0{idx + 1}
      </Text>
      <Text size={24} className="cmp-best-product__name fw-bold">
        {product.caption}
      </Text>
      <Text size={18} className="cmp-best-product__price mb-16">
        {product.price} đ
      </Text>
      <View className="cmp-best-product__image__container">
        <Image
          alt="Unset"
          src={IMAGES[product.image]}
          width={260}
          height={380}
          className="cmp-best-product__image"
        />
        <View className="cmp-best-product__hover">
          <Button variant="secondary-outline" label={'BUY NOW'} className="min-width" />
        </View>
      </View>
    </View>
  );
};

type Props = HTMLProps<HTMLDivElement> & {
  product: Product;
  idx: number;
  isAuthenticated?: boolean;
};

export default BestSellingProduct;
