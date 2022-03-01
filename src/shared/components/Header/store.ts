import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../main/store/rootReducer';

export type HeaderState = {
  loading: boolean;
  error: string | null;
};

const initialState: HeaderState = {
  loading: false,
  error: null,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const getIsLoading = (state: RootState): boolean => state.header.loading;
export const getError = (state: RootState): string | null => state.header.error;

export const { isLoading, setError, clearError } = headerSlice.actions;
export default headerSlice.reducer;
