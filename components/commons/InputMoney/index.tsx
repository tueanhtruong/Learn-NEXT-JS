import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Input } from '..';
import { Callback } from '@/redux/type';
import { MoneyInputDetect } from '@/utils';
import { InputProps } from '../Input';

const customInput = ({ iconName = 'ic_dollar', ...props }) => (
  <Input iconName={iconName} rightAlign {...props} />
);

const InputCurrency: React.FC<Props> = ({
  fixedDecimalScale = false,
  name,
  value,
  onChange,
  ...props
}) => {
  const handleChange = (values: any) => {
    onChange(name, values?.floatValue || 0);
  };
  return (
    <CurrencyFormat
      customInput={customInput}
      thousandSeparator
      fixedDecimalScale={fixedDecimalScale}
      decimalScale={2}
      displayType="input"
      onValueChange={handleChange}
      {...props}
      name={name}
      value={typeof value === 'string' ? value : MoneyInputDetect(value)}
    />
  );
};
type Props = Omit<CurrencyFormat.Props, 'InputProps'> & { InputProps?: InputProps } & {
  fixedDecimalScale?: boolean;
  value: string | number;
  name: string;
  onChange: Callback;
};

export default InputCurrency;
