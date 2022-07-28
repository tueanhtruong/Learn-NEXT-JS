import { MUIDataTableData, MUIDataTableMeta } from 'mui-datatables';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Item } from '../../../redux/shop/type';
import { Callback } from '../../../redux/type';
import { formatMoney } from '../../../utils';

type MetaData = Omit<MUIDataTableMeta, 'tableData'> & { tableData: Array<MUIDataTableData | Item> };

export const allColumns = (onDelete: Callback) => {
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
          const rowData = metaData.tableData[rowIndex] as Item;
          return (
            <FaRegTrashAlt
              size={20}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(rowData.id);
              }}
            />
          );
        },
      },
    },
  ];
};
