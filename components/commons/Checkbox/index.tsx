import React, { HTMLProps, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import shortid from 'shortid';
import Element from '../Element';
import { View } from '..';
import Text from '../Text';
import { isNumeric } from '@/validations';

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className,
  disabled,
  style,
  isCustomLabel,
  isMiddle,
  labelClassName,
  ...props
}) => {
  const id = useRef(shortid.generate());

  return (
    <View
      isRow
      className={cn('cmp-checkbox', { 'cmp-checkbox__disabled': disabled }, className)}
      style={style}
    >
      <input
        id={id.current}
        type="checkbox"
        className={cn('cmp-checkbox__input')}
        style={{ display: 'none' }}
        {...props}
      />
      <label
        htmlFor={id.current}
        className={cn(
          'cmp-checkbox__label',
          'check',
          {
            'custom-label': isCustomLabel,
            'is-middle': isMiddle,
          },
          labelClassName
        )}
      >
        <svg width="18px" height="18px" viewBox="0 0 18 18">
          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z" />
          <polyline points="1 9 7 14 15 4" />
        </svg>
        <span className={cn('cmp-checkbox__label--text')}>{label}</span>
      </label>
    </View>
  );
};
type BaseInputProps = Pick<
  HTMLProps<HTMLInputElement>,
  Exclude<keyof HTMLProps<HTMLInputElement>, 'label'>
>;

type CheckboxProps = BaseInputProps & {
  label?: string | React.ReactElement;
  isCustomLabel?: boolean;
  labelClassName?: string;
  isMiddle?: boolean;
};

const Group: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  name,
  onChange = () => {},
  value = [],
  errorMessage,
  containerClassName,
  columns = 2,
  customColumnMargin,
  disabled,
  description,
  noneOfAboveKey,
  isCustomLabel,
  optionClassName,
  isGetStringValue,
  labelClassName,
}) => {
  const [data, setData] = useState<any[]>(value);
  const hasInteract = useRef(false);

  useEffect(() => {
    // if (hasInteract.current)
    setData(value);
    // onChange(name, data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    hasInteract.current = true;

    const target = event.target as HTMLInputElement;
    const key =
      isNumeric(target.value) && !isGetStringValue ? parseInt(target.value) : target.value;

    const isChecked = data?.indexOf(key) >= 0;

    if (noneOfAboveKey && !isChecked) {
      const noneOfAboveItem = options?.find((x) => x.key === noneOfAboveKey);
      if (noneOfAboveItem) {
        if (noneOfAboveItem.value === key) {
          setData([key]);
          return;
        } else {
          // eslint-disable-next-line no-unsafe-optional-chaining
          setData([...value?.filter((x) => x !== noneOfAboveItem.value), key]);
          return;
        }
      }
    }

    let updated: any[] = [];
    if (isChecked) {
      updated = data?.filter((x) => x !== key);
    } else {
      updated = [...data, key];
    }

    // setData(updated);
    onChange(name, updated);
  };

  const hasDesc = !!description;

  return (
    <Element errorMessage={errorMessage} label={label} className={containerClassName}>
      {hasDesc && <Text className="text-is-14 mb-2">{description}</Text>}
      <View isRow>
        {options?.map((option, index) => (
          <Checkbox
            key={`checkbox-${name}-${index}`}
            value={option.value}
            checked={data?.indexOf(option.value) >= 0}
            label={option.label}
            onChange={handleValueChange}
            className={cn(columns && 'cmp-checkbox-group__column', optionClassName)}
            style={
              customColumnMargin
                ? { marginRight: customColumnMargin + 'px' }
                : { width: `${100 / columns}%` }
            }
            disabled={disabled || option?.disabled}
            name={name}
            isCustomLabel={isCustomLabel}
            labelClassName={labelClassName}
          />
        ))}
      </View>
    </Element>
  );
};

type CheckboxGroupProps = {
  label?: string;
  options?: { value: any; label: string | React.ReactElement; key?: string; disabled?: boolean }[];
  value?: any[];
  name?: string;
  onChange?: (..._arg: any[]) => void;
  errorMessage?: string;
  containerClassName?: string;
  optionClassName?: string;
  description?: string;
  columns?: number;
  customColumnMargin?: number;
  disabled?: boolean;
  noneOfAboveKey?: any;
  isCustomLabel?: boolean;
  isGetStringValue?: boolean;
  labelClassName?: string;
};

export default { Item: Checkbox, Group };
