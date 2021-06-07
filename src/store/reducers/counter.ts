import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from 'store';
import { fetchCount } from 'api';

export interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
};

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: {
    [incrementAsync.pending.type]: (state) => {
      state.status = 'loading';
    },
    [incrementAsync.fulfilled.type]: (state, action) => {
      state.status = 'idle';
      state.value += action.payload;
    }
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectCount: (state: RootState) => number = (state: RootState) => state.counter.value;

export const incrementIfOdd = (amount: number): AppThunk => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default counterSlice.reducer;
