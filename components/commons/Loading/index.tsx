import React from 'react';
import cn from 'classnames';
// import styles from './styles.module.scss';
import View, { ViewProps } from '../View';

const Loading: React.FC<LoadingProps> = ({
  visible = true,
  loadingStyle = 5,
  size = 'normal',
  variant = 'white',
  position = 'relative',
  className,
  ...props
}) => {
  if (visible)
    return (
      <View
        className={cn(
          'cmp-loading',
          `cmp-loading--${variant}`,
          `cmp-loading--${size}`,
          `cmp-loading--${position}`,
          className
        )}
        {...props}
      >
        {loadingStyle === 1 && <LoadingStyle1 />}
        {loadingStyle === 2 && <LoadingStyle2 />}
        {loadingStyle === 3 && <LoadingStyle3 />}
        {loadingStyle === 4 && <LoadingStyle4 />}
        {loadingStyle === 5 && <LoadingStyle5 />}
      </View>
    );

  return null;
};

const LoadingStyle1 = () => (
  <View className={'cmp-loading__style-1'}>
    <View className={'cmp-loading__style-1--child'} />
    <View className={'cmp-loading__style-1--child'} />
  </View>
);

const LoadingStyle2 = () => (
  <View className={'cmp-loading__style-2'}>
    <View className={'cmp-loading__style-2--child'} />
    <View className={'cmp-loading__style-2--child'} />
    <View className={'cmp-loading__style-2--child'} />
    <View className={'cmp-loading__style-2--child'} />
  </View>
);

const LoadingStyle3 = () => <View className={'cmp-loading__style-3'} />;

const LoadingStyle4 = () => (
  <View className={'cmp-loading__style-4'}>
    <View className={'cmp-loading__style-4--child'} />
    <View className={'cmp-loading__style-4--child'} />
    <View className={'cmp-loading__style-4--child'} />
    <View className={'cmp-loading__style-4--child'} />
    <View className={'cmp-loading__style-4--child'} />
    <View className={'cmp-loading__style-4--child'} />
    <View className={'cmp-loading__style-4--child'} />
    <View className={'cmp-loading__style-4--child'} />
    <View className={'cmp-loading__style-4--child'} />
    <View className={'cmp-loading__style-4--child'} />
    <View className={'cmp-loading__style-4--child'} />
    <View className={'cmp-loading__style-4--child'} />
  </View>
);

const LoadingStyle5 = () => <View className={'cmp-loading__style-5'} />;

export type LoadingProps = ViewProps & {
  visible?: boolean;
  loadingStyle?: 1 | 2 | 3 | 4 | 5;
  size?: 'normal' | 'small';
  variant?: 'white' | 'primary' | 'secondary';
  position?: 'relative' | 'absolute';
};

export default Loading;
