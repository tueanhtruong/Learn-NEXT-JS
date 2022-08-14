import React from 'react';
import cn from 'classnames';
import { Grid, View } from '..';
import { isEmpty } from '@/validations';

const ViewItem: React.FC<Props> = ({ label, value, variant = 'is-half', renderIf = true }) => {
  if (!renderIf) return null;

  const isEmptyLine = isEmpty(label) && isEmpty(value);

  if (isEmptyLine)
    return <Grid.Item variant={variant} className={cn('cmp-view-item__empty', variant)} />;

  return (
    <Grid.Item variant={variant} className={cn('cmp-view-item column')}>
      <View className="cmp-view-item__label">{label}</View>
      <View className="cmp-view-item__value">{value || '--'}</View>
    </Grid.Item>
  );
};

type Props = {
  label?: string | React.ReactElement;
  value?: string | boolean | number | React.ReactElement;
  variant?:
    | 'is-three-quarters'
    | 'is-two-thirds'
    | 'is-half'
    | 'is-one-third'
    | 'is-one-quarter'
    | 'is-full';
  renderIf?: boolean;
};

export default ViewItem;
