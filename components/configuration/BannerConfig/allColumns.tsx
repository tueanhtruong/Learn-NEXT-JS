export const allColumns = () => {
  return [
    {
      name: 'order',
      label: 'Order',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: string) => {
          return !!value ? value : '--';
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
          return !!value ? value : '--';
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
          return !!value ? value : '--';
        },
      },
    },
  ];
};
