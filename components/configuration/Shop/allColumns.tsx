import { MUIDataTableData, MUIDataTableMeta } from 'mui-datatables';
import { FaClipboardCheck } from 'react-icons/fa';
import { MdDomainDisabled } from 'react-icons/md';
import { Item, ItemStatus } from '@/redux/shop/type';
import { Callback } from '@/redux/type';
import { formatMoney } from '@/utils';

type MetaData = Omit<MUIDataTableMeta, 'tableData'> & { tableData: Array<MUIDataTableData | Item> };

export const allColumns = (onUpdateStatus: Callback) => {
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
    {
      name: '',
      label: '',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string, metaData: MetaData) => {
          const rowIndex = metaData.rowIndex;
          // eslint-disable-next-line security/detect-object-injection
          const rowData = metaData.tableData[rowIndex] as Item;
          const isNotActive = rowData.status === ItemStatus._Not_Available;
          return isNotActive ? (
            <FaClipboardCheck
              size={20}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onUpdateStatus(rowData.id, ItemStatus._Available);
              }}
            />
          ) : (
            <MdDomainDisabled
              size={20}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onUpdateStatus(rowData.id, ItemStatus._Not_Available);
              }}
            />
          );
        },
      },
    },
  ];
};
