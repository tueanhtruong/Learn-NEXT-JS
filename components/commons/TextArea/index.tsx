import React, { HTMLProps, MouseEventHandler, RefObject, useRef } from 'react';
import cn from 'classnames';
import Element from '../Element';
import View from '../View';
import { Icon } from '..';
import { getRandomId } from '@/utils';
import { isEmpty } from '@/validations*';

const Input: React.FC<InputProps> = ({
  errorMessage,
  label,
  className,
  containerClassName,
  inputRef = null,
  iconName = '',
  onIconClick,
  hasDifferentValue,
  ...props
}) => {
  const id = useRef<string>(`text-area-${getRandomId()}`);

  return (
    <Element
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      className={containerClassName}
      showDifference={hasDifferentValue}
    >
      <View>
        <textarea
          id={id.current}
          className={cn(className, 'cmp-text-area', {
            'cmp-text-area--error': !isEmpty(errorMessage),
          })}
          ref={inputRef}
          {...props}
        />
        {iconName && <Icon name={iconName} className="cmp-text-area__icon" onClick={onIconClick} />}
      </View>
    </Element>
  );
};

type BaseInputProps = Pick<
  HTMLProps<HTMLTextAreaElement>,
  Exclude<keyof HTMLProps<HTMLTextAreaElement>, 'label'>
>;
export type InputProps = BaseInputProps & {
  errorMessage?: string;
  containerClassName?: string;
  inputRef?: RefObject<HTMLTextAreaElement>;
  iconName?: string;
  onIconClick?: MouseEventHandler<HTMLElement>;
  label?: string | React.ReactNode;
  hasDifferentValue?: boolean;
};

export default Input;
