import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Item } from './type';
import { TableParams } from '../type';
import { IRootState } from '../rootReducer';

export interface IShopState {
  items: Item[];
  selectedItem?: Item;
  loading: boolean;
  error?: Error;
  previousItemsParams?: TableParams;
}

const initialState: IShopState = {
  items: [],
  loading: false,
  error: undefined,
  selectedItem: undefined,
};

export const getProfilePreviousItemsParams = (state: IRootState) => state.shop.previousItemsParams;

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setSelectedItem: (state, action: PayloadAction<Item | undefined>) => {
      state.selectedItem = action.payload;
    },
    ////////////////////////////// Shop Item //////////////////////////////
    getShopItemsAction: (state, action: PayloadAction<TableParams>) => {
      state.loading = true;
      state.previousItemsParams = action.payload;
    },
    getShopItemsSuccess: (state, action: PayloadAction<Item[] | null>) => {
      state.loading = false;
      state.items = action.payload ?? [];
    },
    getShopItemsFailed: (state, action: PayloadAction<Error | null>) => {
      state.loading = false;
      state.error = action.payload ?? undefined;
    },
    ////////////////////////////// Update Item //////////////////////////////
    updateShopItemAction: (state, _action: PayloadAction<Item>) => {
      state.loading = true;
    },
    updateShopItemSuccess: (state, action: PayloadAction<Item>) => {
      state.selectedItem = action.payload;
      state.loading = false;
    },
    updateShopItemFailed: (state, action: PayloadAction<Error | null>) => {
      state.loading = false;
      state.error = action.payload ?? undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedItem,
  ////////////////////////////// Update Item //////////////////////////////
  updateShopItemAction,
  updateShopItemFailed,
  updateShopItemSuccess,
  ////////////////////////////// Shop Item //////////////////////////////
  getShopItemsAction,
  getShopItemsFailed,
  getShopItemsSuccess,
} = shopSlice.actions;

export const shopState = shopSlice.getInitialState();

export default shopSlice.reducer;
