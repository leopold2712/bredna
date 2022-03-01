/* eslint-disable consistent-return */
import { createAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../main/store/rootReducer';
import { loginAsync, signup, meAsync, sendRecoverPassword } from './actions';
import type { MyProfileDTO } from '../../../shared/dtos/myProfile.dto';
import formSaver from '../../../shared/store/formSaver';
import formStorage from '../../../shared/utils/formStorage';

export type AuthState = {
  isAuthenticated: boolean;
  loading: boolean;
  user?: MyProfileDTO;
};

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
};

export const setAuthenticated = createAction<boolean>('setAuthenticated');

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('_token');

      state.isAuthenticated = false;
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAsync.rejected, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    });

    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signup.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(setAuthenticated, (state, action) => {
      state.isAuthenticated = action.payload;
    });

    builder.addCase(meAsync.fulfilled, (state, action) => {
      state.isAuthenticated = !!action.payload;
      formSaver.setUser(action.payload.email ? action.payload.email : '');
      formStorage.init(action.payload.id?.toString() || '');
      state.user = action.payload;
    });
    builder.addCase(meAsync.rejected, (state) => {
      state.isAuthenticated = false;
    });

    builder.addCase(sendRecoverPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendRecoverPassword.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(sendRecoverPassword.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export const getUser = (state: RootState): MyProfileDTO => state.auth.user!;

export const { logout, isAuthenticated } = authSlice.actions;

export default authSlice.reducer;
