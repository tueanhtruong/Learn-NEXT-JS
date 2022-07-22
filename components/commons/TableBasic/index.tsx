import MUIDataTable, {
  debounceSearchRender,
  MUIDataTableOptions,
  MUIDataTableProps,
  MUIDataTableState,
} from 'mui-datatables';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import View from '../View';

const TableBasic: React.FC<Props> = ({
  isLoading,
  containerClassName,
  onTableChange,
  options,
  ...props
}) => {
  const tableOptions: MUIDataTableOptions = {
    serverSide: true,
    searchOpen: false,
    search: true,
    download: false,
    filter: true,
    print: false,
    viewColumns: false,
    selectableRowsHeader: false,
    selectableRows: 'none',
    textLabels: {
      body: {
        noMatch: isLoading ? 'Loading...' : 'No data',
      },
    },
    jumpToPage: true,
    rowHover: true,
    onTableChange,
    customSearchRender: debounceSearchRender(500),
    ...options,
  };

  const hasRowClickAction = !!options?.onRowClick;
  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiPaper: {
          elevation4: {
            boxShadow: 'none',
          },
          root: {
            boxShadow: 'none !important',
          },
        },
        MuiTableRow: {
          hover: {
            cursor: hasRowClickAction ? 'pointer' : 'default',
          },
        },
        MuiTableBody: {
          root: {
            opacity: isLoading ? 0.3 : 1,
          },
        },
        MuiPopover: {
          paper: {
            minWidth: 300,
          },
        },
      },
    });

  // More info: https://github.com/gregnb/mui-datatables
  return (
    <View className={cn('cmp-table-basic', containerClassName)}>
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable options={tableOptions} {...props} />
      </MuiThemeProvider>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  MUIDataTableProps & {
    containerClassName?: string;
    currentPage?: number;
    total?: number;
    onTableChange: (_action: string, _tableState: MUIDataTableState) => void;
    isLoading?: boolean;
  };

const mapStateToProps = () => ({});

const mapDispatchToProps = (_dispatch: (_arg0: { payload: any; type: string }) => any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(memo(TableBasic));
