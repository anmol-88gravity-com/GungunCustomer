import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import messaging from '@react-native-firebase/messaging';

import { ApiEndpoints } from '../ApiEndPoints';
import { Axios } from '../../lib/Axios';
import Config from '../../config';
import { load, remove, save } from '../../utils/storage';

export const AUTH_LOGOUT = '/api/auth/logout';
export const AUTH_RESTORE = '/api/auth/restore';
export const REGISTER = '/auth/register';
export const LOGIN = '/auth/login';
export const REGISTER_OTP = '/auth/register-otp';
export const VERIFY_OTP = '/auth/verify-otp';

const createSession = async payload => {
  await save(Config.USER_SESSION, payload);
};

export const restoreSession = createAsyncThunk(AUTH_RESTORE, async () => {
  const result = await load(Config.USER_SESSION);
  if (result) {
    return result;
  }
});

export const logout = createAsyncThunk(AUTH_LOGOUT, async (_, thunkAPI) => {
  const { userId } = thunkAPI.getState().auth;
  const result = await Axios.delete(
    ApiEndpoints.cart.deleteWholeCart.replace('USER_ID', String(userId)),
  );
  if (result.data.status === 'ok') {
    await remove(Config.CART_ID);
    await remove(Config.USER_SESSION);
    return true;
  }
});

export const login = createAsyncThunk(
  LOGIN,
  async ({phoneNumber, password}, {rejectWithValue, fulfillWithValue}) => {
    // const token = await messaging().getToken();
    let token;

    const result = await Axios.post(ApiEndpoints.auth.login, {
      phone_number: phoneNumber,
      password: password,
      fcm_token: token,
    });
    if (result.data.status === 'ok') {
      const success = {
        userId: result.data.response.id,
        token: result.data.response.token.refresh,
        accessToken: result.data.response.token.access,
      };

      await createSession(success);
      return fulfillWithValue(success);
    } else {
      return rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const register = createAsyncThunk(
  REGISTER,
  async (
    { fullName, password, confirmPassword, email, phoneNumber },
    { rejectWithValue, fulfillWithValue },
  ) => {
    // await messaging().registerDeviceForRemoteMessages();
    // const token = await messaging().getToken();
    let token;

    const result = await Axios.post(ApiEndpoints.auth.register, {
      name: fullName,
      password: password,
      password2: confirmPassword,
      email: email,
      phone_number: phoneNumber,
      fcm_token: token,
    });
    if (result.data.status === 'ok') {
      const success = {
        userId: result.data.response.id,
        token: result.data.response.token.refresh,
        accessToken: result.data.response.token.access,
      };

      await createSession(success);
      return fulfillWithValue(success);
    } else {
      return rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const registerOTP = createAsyncThunk(
  REGISTER_OTP,
  async ({ phoneNumber }, { rejectWithValue }) => {
    const result = await Axios.post(ApiEndpoints.auth.registerOtp, {
      phone_number: phoneNumber,
    });
    if (result.data.status === 'ok') {
      return true;
    } else {
      return rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const otpVerify = createAsyncThunk(
  VERIFY_OTP,
  async ({ mobileNumber, code }, { rejectWithValue }) => {
    const result = await Axios.post(ApiEndpoints.auth.otpVerify, {
      phone_number: mobileNumber,
      otp: code,
    });
    if (result.data.status === 'ok') {
      return true;
    } else {
      return rejectWithValue(new Error(result.data.msg));
    }
  },
);

const initialState = {
  isLoading: false,
  userId: null,
  token: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.accessToken = action.payload.accessToken;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.accessToken = action.payload.accessToken;
    });

    // restore session
    builder.addCase(restoreSession.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(restoreSession.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload?.token) {
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.accessToken = action.payload.accessToken;
      }
    });
    builder.addCase(restoreSession.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { } = authSlice.actions;

export default authSlice.reducer;
