import { createSlice } from '@reduxjs/toolkit';
import { MyProfileDTO } from '../../../shared/dtos/myProfile.dto';
import { getMyProfile } from './actions/getMyProfile';
import { updateMyProfileAsync } from './actions/updateMyProfile';
import { updateProfilePictureAsync } from './actions/updateProfilePicture';

export type AuthState = {
  user?: MyProfileDTO | null;
  unreadMessages?: number;
};

const initialState: AuthState = {
  user: null,
};

const myProfileSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getMyProfile.rejected, (state) => {
      state.user = null;
    });
    builder.addCase(updateMyProfileAsync.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export default myProfileSlice.reducer;

export { updateMyProfileAsync } from './actions/updateMyProfile';
export { MyProfileActions } from './actions';
