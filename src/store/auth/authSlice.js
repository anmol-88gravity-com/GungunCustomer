import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import messaging from '@react-native-firebase/messaging';

import { ApiEndpoints } from '../ApiEndPoints';
import { Axios } from '../../lib/Axios';
import Config from '../../config';
import { load, remove, save } from '../../utils/storage';
import { Platform } from 'react-native';

export const AUTH_LOGOUT = '/api/auth/logout';
export const AUTH_RESTORE = '/api/auth/restore';
export const REQUEST_OTP = '/auth/request-otp';
export const VERIFY_OTP = '/auth/verify-otp';

const createSession = async (payload) => {
  await save(Config.USER_SESSION, payload);
};

export const restoreSession = createAsyncThunk(AUTH_RESTORE, async () => {
  const result = await load(Config.USER_SESSION);
  if (result) {
    return result;
  }
});

export const logout = createAsyncThunk(AUTH_LOGOUT, async (_, thunkAPI) => {
  await remove(Config.USER_SESSION);
  return true;
});

export const requestOTP = createAsyncThunk(
  REQUEST_OTP,
  async ({ phoneNumber }, { rejectWithValue }) => {
    try {
      const result = await Axios.post(ApiEndpoints.auth.requestOtp, {
        phone_number: phoneNumber,
      });

      if (result.data.status === 'ok') {
        return true;
      } else {
        return rejectWithValue(new Error(result.data.msg));
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to request OTP.');
    }
  }
);

export const verifyOTP = createAsyncThunk(
  VERIFY_OTP,
  async ({ phoneNumber, otp }, { rejectWithValue, fulfillWithValue }) => {
    try {
      let token;
      if (Platform.OS !== 'ios') {
        token = await messaging().getToken();
      }

      const result = await Axios.post(ApiEndpoints.auth.verifyOtp, {
        phone_number: phoneNumber,
        otp,
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
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to verify OTP.');
    }
  }
);

const initialState = {
  isLoading: false,
  userId: null,
  token: null,
  accessToken: null,
  otpRequested: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Request OTP
    builder.addCase(requestOTP.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(requestOTP.fulfilled, (state) => {
      state.isLoading = false;
      state.otpRequested = true;
    });
    builder.addCase(requestOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Error requesting OTP.';
    });

    // Verify OTP
    builder.addCase(verifyOTP.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(verifyOTP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.accessToken = action.payload.accessToken;
      state.otpRequested = false; // Reset OTP state after successful verification
    });
    builder.addCase(verifyOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Error verifying OTP.';
    });

    // Restore session
    builder.addCase(restoreSession.pending, (state) => {
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
    builder.addCase(restoreSession.rejected, (state) => {
      state.isLoading = false;
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.userId = null;
      state.token = null;
      state.accessToken = null;
      state.otpRequested = false;
    });
  },
});

export default authSlice.reducer;
