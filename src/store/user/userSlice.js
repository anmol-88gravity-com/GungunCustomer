import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiEndpoints } from '../ApiEndPoints';
import { Axios } from '../../lib/Axios';

export const CHANGE_PASSWORD = '/api/change-Password';
export const USER_PROFILE = '/api/customer-profile';

export const changePassword = createAsyncThunk(
  CHANGE_PASSWORD,
  async ({ confirmPassword, newPassword }, { rejectWithValue }) => {
    const result = await Axios.put(ApiEndpoints.user.changePassword, {
      new_password: newPassword,
      confirm_password: confirmPassword,
    });
    if (result.data.status === 'ok') {
      return true;
    } else {
      return rejectWithValue(new Error(result.data.msg));
    }
  },
);

//User_Profile----

export const getUserProfile = createAsyncThunk(
  USER_PROFILE,
  async ({ user_Id }, { rejectWithValue }) => {
    // const result = await Axios.get(ApiEndpoints.profile.getUserProfile, {
    //   USER_ID: user_Id,
    // });
    const result = await Axios.get(ApiEndpoints.profile.getUserProfile + `${"17"}`);
    console.log('userId-slice--', result)
    if (result.data.status === 'ok') {
      return true;
    } else {
      return rejectWithValue(new Error(result.data.msg));
    }
  },
);




export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {},
  extraReducers: builder => {

      builder.addCase(getUserProfile.fulfilled, (state, action) => {
        console.log('slice , action, state',state,action)
        state.userId = action.payload.userId;
        state.token = action.payload.token;
        state.accessToken = action.payload.accessToken;
      });

   
  },
});

export const { } = userSlice.actions;

export default userSlice.reducer;
