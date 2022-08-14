import React, { useRef } from 'react';
import cn from 'classnames';
import PhoneInput, { DefaultInputComponentProps } from 'react-phone-number-input';
import View from '../View';
import Element from '../Element';
import { isEmpty } from '@/validations';
import { getRandomId } from '@/utils';

const InputPhone: React.FC<DefaultInputComponentProps> = ({
  label,
  errorMessage,
  containerClassName = '',
  onChange,
  ...props
}) => {
  const id = useRef(`input-phone-${getRandomId()}`);

  // For change style of phone input, follow:
  // https://catamphetamine.gitlab.io/react-phone-number-input/
  return (
    <Element
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      className={containerClassName}
    >
      <View>
        <PhoneInput
          onChange={onChange}
          international
          defaultCountry="US"
          className={cn('cmp-phoneinput', {
            'cmp-phoneinput__input--error': !isEmpty(errorMessage),
          })}
          {...props}
        />
      </View>
    </Element>
  );
};

export default InputPhone;
