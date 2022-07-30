/* eslint-disable react/self-closing-comp */
/* eslint-disable security/detect-object-injection */
import _ from 'lodash';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Callback } from '../../../../../redux/type';
import { Button, Text, View } from '../../../../commons';
import Player from './player';
import SuccessPlayer from './successPlayer';
// import { FaCartPlus } from 'react-icons/fa';

const OrderField: NextPage<Props> = ({ onAdd }) => {
  const [itemNumber, setItemNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (!loading) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  }, [loading]);

  return (
    <View flexGrow={1} isRow className="px-32 " justify="space-between" align="center">
      <View isRow align="center" justify="space-between" flexGrow={1} style={{ maxWidth: '50%' }}>
        <Button
          className="cmp-shop-item__img__order__button"
          icon={<FaMinus size={18} />}
          disabled={itemNumber === 1}
          onClick={() => setItemNumber((sum) => sum - 1)}
        />
        <Text size={18} className="fw-bold mx-8 has-text-danger">
          {itemNumber}
        </Text>
        <Button
          className="cmp-shop-item__img__order__button"
          icon={<FaPlus size={18} />}
          onClick={() => setItemNumber((sum) => sum + 1)}
        />
      </View>
      <View>
        {showSuccess ? (
          <SuccessPlayer />
        ) : (
          <Player loading={loading} onAdd={() => setLoading(!loading)} />
        )}
      </View>
    </View>
  );
};

type Props = {
  onAdd?: Callback;
};

export default OrderField;
