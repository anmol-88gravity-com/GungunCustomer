import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ApiEndpoints} from '../ApiEndPoints';
import {Axios} from '../../lib/Axios';

export const CHANGE_PASSWORD = '/api/change-Password';

export const changePassword = createAsyncThunk(
  CHANGE_PASSWORD,
  async ({confirmPassword, newPassword}, {rejectWithValue}) => {
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

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {},
  extraReducers: builder => {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
