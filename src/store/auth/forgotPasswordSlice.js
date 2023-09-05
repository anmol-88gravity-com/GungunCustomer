import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ApiEndpoints} from '../ApiEndPoints';
import {Axios} from '../../lib/Axios';

export const GENERATE_OTP = '/api/auth/generate-otp';
export const UPDATE_PASSWORD = '/api/auth/update-Password';
export const VERIFY_OTP = '/api/auth/verify-otp';

export const generateOTP = createAsyncThunk(
  GENERATE_OTP,
  async ({phoneNumber}, {rejectWithValue}) => {
    const result = await Axios.post(ApiEndpoints.auth.otpGenerate, {
      phone_number: phoneNumber,
    });
    if (result.data.status === 'ok') {
      console.warn('OTP : ', result.data.response.otp);
      return true;
    } else {
      return rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const otpVerify = createAsyncThunk(
  VERIFY_OTP,
  async ({phoneNumber, code}, {rejectWithValue}) => {
    const result = await Axios.post(ApiEndpoints.auth.otpVerify, {
      phone_number: phoneNumber,
      otp: code,
    });
    if (result.data.status === 'ok') {
      return true;
    } else {
      return rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const updatePassword = createAsyncThunk(
  UPDATE_PASSWORD,
  async ({phoneNumber, newPassword}, {rejectWithValue}) => {
    const result = await Axios.post(ApiEndpoints.auth.updatePassword, {
      new_password: newPassword,
      phone_number: phoneNumber,
    });
    if (result.data.status === 'ok') {
      return true;
    } else {
      return rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: null,
  reducers: {},
  extraReducers: builder => {},
});

export const {} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
