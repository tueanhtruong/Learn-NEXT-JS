/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { HTMLProps, MouseEventHandler, RefObject, useRef } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import Element from '../Element';
import View from '../View';
import InputMask from 'react-input-mask';
import Icon from '../Icon';
import { getRandomId } from '../../../utils';
import { isEmpty } from '../../../validations';
import { IRootState } from '../../../redux/rootReducer';

const Input: React.FC<InputProps> = ({
  children,
  errorMessage,
  label,
  className,
  subLabel,
  containerClassName,
  inputRef = null,
  onIconClick,
  iconName = null,
  mask = '***',
  hasDifferentValue,
  ...props
}) => {
  //   9: 0-9
  //   a: A-Z, a-z
  //   *: A-Z, a-z, 0-9
  const id = useRef<string>(`input-${getRandomId()}`);

  return (
    <Element
      id={id.current}
      showDifference={hasDifferentValue}
      errorMessage={errorMessage}
      label={label}
      subLabel={subLabel}
      className={containerClassName}
    >
      <View>
        <InputMask
          id={id.current}
          className={cn(className, 'cmp-input', {
            'cmp-input--error': !isEmpty(errorMessage),
            'cmp-input--icon': !!iconName,
          })}
          mask={mask}
          ref={inputRef}
          {...props}
        />
        {iconName && (
          <Icon name={iconName} className={cn('cmp-input__icon')} onClick={onIconClick} />
        )}
      </View>
    </Element>
  );
};

type BaseInputProps = Pick<
  HTMLProps<HTMLInputElement>,
  Exclude<keyof HTMLProps<HTMLInputElement>, 'label'>
> & { maskChar?: string | null };
export type InputProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  BaseInputProps & {
    errorMessage?: string;
    containerClassName?: string;
    inputRef?: any;
    subLabel?: string | React.ReactNode;
    onIconClick?: MouseEventHandler<HTMLElement>;
    label?: string | React.ReactNode;
    iconName?: string;
    mask: string;
    // maskChar?: string | null;
    hasDifferentValue?: boolean;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
