import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ModalData } from './type';

export interface IModalState {
  isVisible: boolean;
  startClosing: boolean;
  type: string;
  data: ModalData;
  loading: boolean;
}

const initialState: IModalState = {
  isVisible: false,
  type: '',
  data: {},
  startClosing: false,
  loading: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    hideModal: (state) => {
      state.isVisible = false;
      state.type = '';
      state.data = {};
    },
    showModal: (state, action: PayloadAction<{ data: ModalData; type: string }>) => {
      state.data = action.payload.data;
      state.type = action.payload.type;
      state.isVisible = true;
    },
    closeModal: (state) => {
      state.startClosing = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { closeModal, hideModal, showModal } = modalSlice.actions;

export const modalState = modalSlice.getInitialState();

export default modalSlice.reducer;
