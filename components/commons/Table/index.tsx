import React, { memo, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  MUIDataTableColumn,
  MUIDataTableOptions,
  MUIDataTableState,
  MUISortOptions,
} from 'mui-datatables';
import appConfig from '../../../app-config';
import TableBasic from '../TableBasic';
import { IRootState } from '../../../redux/rootReducer';

const Table: React.FC<Props> = ({
  title,
  data,
  tableOptions,
  columns,
  refresh,
  defaultSortOrder,
  isLoading,
  onAction,
}) => {
  const tableStateRef = useRef<MUIDataTableState>();

  useEffect(() => {
    handleTriggerAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const getFilterParams = (tableState?: MUIDataTableState) => {
    if (!tableState) return {};
    const params: any = {};

    tableState.filterList.forEach((filter: string[], idx: number) => {
      if (filter.length > 0) {
        // eslint-disable-next-line security/detect-object-injection
        const column = columns[idx];
        const name = column?.name;
        // eslint-disable-next-line security/detect-object-injection
        params[name] = filter;
      }
    });

    return params;
  };

  const getActionParams = () => {
    const tableState = tableStateRef.current;

    const rowsPerPage = tableState?.rowsPerPage || appConfig.ROWS_PER_PAGE;
    const page = tableState?.page || 0;
    const searchText = tableState?.searchText;

    const filterParams = getFilterParams(tableState);
    const params = {
      take: rowsPerPage,
      skip: page * rowsPerPage,
      sort: tableState?.sortOrder.name || defaultSortOrder?.name,
      order: tableState?.sortOrder.direction || defaultSortOrder?.direction,
      search: searchText,
      ...filterParams,
    };

    return params;
  };

  const handleTriggerAction = () => {
    const params = getActionParams();
    onAction(params);
  };

  const handleTableChange = async (action: any, tableState: MUIDataTableState) => {
    tableStateRef.current = tableState;
    switch (action) {
      case 'changeRowsPerPage':
      case 'changePage':
      case 'sort':
      case 'search':
      case 'filterChange':
      case 'resetFilters':
        handleTriggerAction();
        break;
      default:
        break;
    }
  };

  return (
    <TableBasic
      title={title}
      data={data}
      columns={columns}
      options={tableOptions}
      onTableChange={handleTableChange}
      containerClassName="cmp-table"
      isLoading={isLoading}
    />
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    title: string;
    data: any[];
    tableOptions: MUIDataTableOptions;
    columns: MUIDataTableColumn[];
    refresh?: boolean | number | string;
    onAction: (...args: any[]) => void;
    defaultSortOrder?: MUISortOptions;
    isLoading?: boolean;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Table));
