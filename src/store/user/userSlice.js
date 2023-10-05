import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ApiEndpoints} from '../ApiEndPoints';
import {Axios} from '../../lib/Axios';
import {Platform} from 'react-native';

export const CHANGE_PASSWORD = '/api/change-Password';
export const USER_PROFILE = '/api/customer-profile';
export const UPDATE_USER_PROFILE = '/api/customer-profile';

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

export const getUserProfile = createAsyncThunk(
  USER_PROFILE,
  async (_, thunkAPI) => {
    const {userId} = thunkAPI.getState().auth;
    const result = await Axios.get(
      ApiEndpoints.profile.getUserProfile.replace('USER_ID', String(userId)),
    );
    if (result.data.status === 'ok') {
      return thunkAPI.fulfillWithValue(result.data.response.partner_profile);
    } else {
      return thunkAPI.rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  UPDATE_USER_PROFILE,
  async (
    {fullName, email, phoneNumber, gender, birthday, anniversary, profilePic},
    thunkAPI,
  ) => {
    const {userId} = thunkAPI.getState().auth;
    const formData = new FormData();
    formData.append('user', String(userId));
    formData.append('gender', gender);
    formData.append('birthday', String(birthday));
    formData.append('anniversary', String(anniversary));
    formData.append('name', fullName);
    formData.append('email', email);
    formData.append('phone_number', phoneNumber);
    if (profilePic.name) {
      formData.append('profile_image', {
        uri:
          Platform.OS === 'ios'
            ? profilePic?.uri?.replace('file://', '')
            : profilePic.uri,
        name: profilePic.name,
        type: profilePic.type,
      });
    }
    const result = await Axios.patch(
      ApiEndpoints.profile.editProfile.replace('USER_ID', String(userId)),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    if (result.data.status === 'ok') {
      console.log('result.data.status', result.data.status);
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
  extraReducers: builder => {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
