import { formatMoney } from '../../../utils';

export const allColumns = () => {
  return [
    {
      name: 'price',
      label: 'Price',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: number) => {
          return value ? formatMoney(value) : '--';
        },
      },
    },
    {
      name: 'label',
      label: 'Label',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: string) => {
          return value ? value : '--';
        },
      },
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: string) => {
          return value ? value : '--';
        },
      },
    },
  ];
};
