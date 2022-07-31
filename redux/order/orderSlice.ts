import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { OrderItem } from './type';
import { IRootState } from '../rootReducer';

export interface IOrderState {
  orders: OrderItem[];
  successAddedItemKey: string;
  addingKey: string;
  loading: boolean;
  error?: Error;
}

const initialState: IOrderState = {
  orders: [],
  loading: false,
  error: undefined,
  addingKey: '',
  successAddedItemKey: '',
};

export const getCurrentOrderItems = (state: IRootState) => state.order.orders;

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setSuccessAddedItemKey: (state, action: PayloadAction<string>) => {
      state.successAddedItemKey = action.payload;
    },
    ////////////////////////////// Order OrderItem //////////////////////////////
    getOrderItemsAction: (state, _action: PayloadAction<{ id: string }>) => {
      state.loading = true;
    },
    getOrderItemsSuccess: (state, action: PayloadAction<OrderItem[] | null>) => {
      state.loading = false;
      state.orders = action.payload ?? [];
    },
    getOrderItemsFailed: (state, action: PayloadAction<Error | null>) => {
      state.loading = false;
      state.error = action.payload ?? undefined;
    },
    ////////////////////////////// Update OrderItem //////////////////////////////
    addOrderItemAction: (state, action: PayloadAction<{ item: OrderItem; id: string }>) => {
      state.loading = true;
      state.addingKey = action.payload.item?.key;
    },
    addOrderItemSuccess: (state, action: PayloadAction<{ item: OrderItem; id: string }>) => {
      state.successAddedItemKey = action.payload.item?.key;
      state.loading = false;
      state.addingKey = '';
    },
    addOrderItemFailed: (state, action: PayloadAction<Error | null>) => {
      state.loading = false;
      state.addingKey = '';
      state.error = action.payload ?? undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSuccessAddedItemKey,
  ////////////////////////////// Add OrderItem //////////////////////////////
  addOrderItemAction,
  addOrderItemFailed,
  addOrderItemSuccess,
  ////////////////////////////// get OrderItem //////////////////////////////
  getOrderItemsAction,
  getOrderItemsFailed,
  getOrderItemsSuccess,
} = orderSlice.actions;

export const orderState = orderSlice.getInitialState();

export default orderSlice.reducer;
