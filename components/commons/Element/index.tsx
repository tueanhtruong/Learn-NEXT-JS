import React from 'react';
import cn from 'classnames';

import View, { ViewProps } from '../View';
import { isEmpty } from '@/validations';
// import { isEmpty } from '@/validations';

const Element: React.FC<Props> = ({
  id,
  children,
  errorMessage,
  showDifference,
  label,
  className,
  subLabel,
  iconLabel,
  ...props
}) => {
  const hasError = !isEmpty(errorMessage);
  const hasLabel = !isEmpty(label);
  const hasSubLabel = !isEmpty(subLabel);

  return (
    <View className={cn(className, 'form-element')} {...props}>
      {hasLabel && (
        <View justify="flex-start" align="center" isRow>
          {iconLabel && iconLabel}
          <label
            className={cn({ 'has-bg-difference': showDifference, 'ml-8': iconLabel })}
            htmlFor={id}
          >
            {label}
          </label>
        </View>
      )}

      {hasSubLabel && subLabel}
      {children}
      {hasError && <p className="form-element__error">{errorMessage}</p>}
    </View>
  );
};

type Props = ViewProps & {
  children: React.ReactNode;
  id?: string;
  label?: string | React.ReactNode;
  errorMessage?: string;
  className?: string;
  subLabel?: string | React.ReactNode;
  showDifference?: boolean;
  iconLabel?: React.ReactNode;
};

export default Element;
