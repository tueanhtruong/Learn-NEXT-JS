import { Checkbox } from '../../commons';

export const allColumns = () => {
  return [
    {
      name: 'displayName',
      label: 'Name',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: string) => {
          return value ? value : '--';
        },
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: string) => {
          return value ? value : '--';
        },
      },
    },
    {
      name: 'isAdmin',
      label: 'Admin',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: boolean) => {
          return <Checkbox.Item label={''} checked={!!value} readOnly />;
        },
      },
    },
  ];
};
