import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiEndpoints } from '../ApiEndPoints';
import { Axios } from '../../lib/Axios';

export const CHANGE_PASSWORD = '/api/change-Password';
export const USER_PROFILE = '/api/customer-profile';
export const UPDATE_USER_PROFILE = '/api/customer-profile';

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
  async (_, thunkAPI) => {
    const { userId } = thunkAPI.getState().auth;
    const result = await Axios.get(
      ApiEndpoints.profile.getUserProfile.replace('USER_ID', String(userId)),
    );
    if (result.data.status === 'ok') {
      return thunkAPI.fulfillWithValue(result.data.response);
    } else {
      return thunkAPI.rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  UPDATE_USER_PROFILE,
  async ({
    fullName,
    email,
    phoneNumber,
    selectedGender,
    birthday,
    anniversarry,
    profileImage }, thunkAPI,) => {
    const { userId } = thunkAPI.getState().auth;
    const formData = new FormData();
    formData.append('user', userId);
    formData.append('gender', selectedGender);
    formData.append('birthday', birthday);
    formData.append('anniversary', anniversarry);
    formData.append('name', fullName);
    formData.append('email', email);
    formData.append('phone_number', phoneNumber);
    formData.append('profile_image', {
      uri: profileImage,
      name: 'profile_image.jpg',
      type: 'image/jpeg',
    });
    const result = await Axios(`http://206.189.133.64:8000/api/customer-profile/${userId}`, {
      // const result = await Axios(ApiEndpoints.profile.editProfile + `${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
    console.log('updateUserprofile--', result)
    if (result.data.status === 'ok') {
      return true;
    } else {
      return thunkAPI.rejectWithValue(new Error(result.data.msg));
    }
  },
);



export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {},
  extraReducers: builder => { },
});

export const { } = userSlice.actions;

export default userSlice.reducer;
