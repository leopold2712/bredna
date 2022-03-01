import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../main/store/rootReducer';
import { MyProfileActions } from '../../../feature/MyProfile/store/actions';

type ErrorInfo = { msg?: string; code?: number };

type ErrorState = { [key: string]: ErrorInfo | string };

type ErrorCaseReducers = {
  setError: (
    state: ErrorState,
    action: PayloadAction<{ typePrefix: string; error: ErrorInfo }>,
  ) => void;
  clearError: (state: ErrorState, action: PayloadAction<{ typePrefix: string }>) => void;
  resetErrors: () => ErrorState;
};

type ErrorSliceName = 'error';

const initialState: ErrorState = {
  [MyProfileActions.update]: {},
  signup: '',
};

const errorSlice = createSlice<ErrorState, ErrorCaseReducers, ErrorSliceName>({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      const { typePrefix, error } = action.payload;
      if (Object.prototype.hasOwnProperty.call(state, typePrefix)) {
        state[typePrefix] = error;
      } else {
        console.warn(`[Redux error]: there is no '${typePrefix}' error state property`);
      }
    },
    clearError: (state, action) => {
      const { typePrefix } = action.payload;
      if (Object.prototype.hasOwnProperty.call(state, typePrefix)) {
        state[typePrefix] = '';
      } else {
        console.warn(`[Redux error]: there is no '${typePrefix}' error state property`);
      }
    },
    resetErrors: () => initialState,
  },
});

export const getError = (state: RootState): ErrorState => state.error;

export const { setError, clearError, resetErrors } = errorSlice.actions;
export default errorSlice.reducer;
