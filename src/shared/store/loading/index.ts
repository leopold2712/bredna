/* eslint-disable no-console */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyProfileActions } from '../../../feature/MyProfile/store/actions';

type LoadingState = { [key: string]: boolean };

type LoadingCaseReducers = {
  setLoading: (
    state: LoadingState,
    action: PayloadAction<{ typePrefix: string; is: boolean }>,
  ) => void;
  resetLoadings: () => LoadingState;
};

type LoadingSliceName = 'loading';

const initialState: LoadingState = {
  [MyProfileActions.update]: false,
};

const loadingSlice = createSlice<LoadingState, LoadingCaseReducers, LoadingSliceName>({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      const { typePrefix, is } = action.payload;
      if (Object.prototype.hasOwnProperty.call(state, typePrefix)) {
        state[typePrefix] = is;
      } else {
        console.warn(`[Redux loading]: there is no '${typePrefix}' loading state property`);
      }
    },
    resetLoadings: () => initialState,
  },
});

export const { setLoading, resetLoadings } = loadingSlice.actions;
export default loadingSlice.reducer;
