import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Todo } from './type';

export interface IContentState {
  value: number;
  todoList: Todo[];
  loading: boolean;
}

const initialState: IContentState = {
  value: 0,
  todoList: [],
  loading: false,
};

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    incrementValue: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrementValue: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    getTodoListAction: (state) => {
      state.loading = true;
    },
    getTodoListActionSuccess: (state, action: PayloadAction<Todo[]>) => {
      state.loading = false;
      state.todoList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  incrementValue,
  decrementValue,
  incrementByAmount,
  getTodoListAction,
  getTodoListActionSuccess,
} = contentSlice.actions;

export default contentSlice.reducer;
