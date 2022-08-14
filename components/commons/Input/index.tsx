import React, { HTMLProps, MouseEventHandler, RefObject, useRef } from 'react';
import cn from 'classnames';
import { getRandomId } from '@/utils';
// import './styles.scss';
import Element from '../Element';
import View from '../View';
import { Icon } from '..';
import { isEmpty } from '@/validations';

const Input: React.FC<InputProps> = ({
  errorMessage,
  label,
  className,
  containerClassName,
  inputRef = null,
  iconName = '',
  subLabel,
  onIconClick,
  rightAlign,
  hasDifferentValue,
  ...props
}) => {
  const id = useRef<string>(`input-${getRandomId()}`);

  return (
    <Element
      showDifference={hasDifferentValue}
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      className={containerClassName}
      subLabel={subLabel}
    >
      <View>
        <input
          id={id.current}
          className={cn(
            className,
            'cmp-input',
            {
              'cmp-input--error': !isEmpty(errorMessage),
            },
            {
              'cmp-input--icon': !isEmpty(iconName),
            },
            { rightAlign }
          )}
          ref={inputRef}
          {...props}
        />
        {iconName && (
          <Icon
            name={iconName}
            className={cn('cmp-input__icon', { rightAlign })}
            onClick={onIconClick}
          />
        )}
      </View>
    </Element>
  );
};

type BaseInputProps = Pick<
  HTMLProps<HTMLInputElement>,
  Exclude<keyof HTMLProps<HTMLInputElement>, 'label'>
>;
export type InputProps = BaseInputProps & {
  errorMessage?: string;
  containerClassName?: string;
  inputRef?: RefObject<HTMLInputElement>;
  subLabel?: string | React.ReactNode;
  iconName?: string;
  onIconClick?: MouseEventHandler<HTMLElement>;
  label?: string | React.ReactNode;
  rightAlign?: boolean;
  hasDifferentValue?: boolean;
};

export default Input;
