import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import messaging from '@react-native-firebase/messaging';

import { ApiEndpoints } from '../ApiEndPoints';
import { Axios } from '../../lib/Axios';
import Config from '../../config';
import { load, remove, save } from '../../utils/storage';
import { Platform } from 'react-native';

export const AUTH_LOGOUT = '/api/auth/logout';
export const AUTH_RESTORE = '/api/auth/restore';
export const REGISTER = '/auth/register';
export const LOGIN = '/auth/login';
export const GENERATE_OTP_LOGIN = '/auth/generate-otp';
export const VERIFY_OTP_LOGIN = '/auth/verify-otp';

const createSession = async (payload) => {
  await save(Config.USER_SESSION, payload);
};

export const restoreSession = createAsyncThunk(AUTH_RESTORE, async () => {
  const result = await load(Config.USER_SESSION);
  if (result) {
    console.log('Restoring session:', result); // Log restored session
    return result;
  }
});

export const logout = createAsyncThunk(AUTH_LOGOUT, async (_, thunkAPI) => {
  await remove(Config.USER_SESSION);
  console.log('User logged out');
  return true;
});

// Modify Login to follow OTP flow
export const login = createAsyncThunk(
  LOGIN,
  async ({ phoneNumber, otp }, { rejectWithValue, fulfillWithValue, dispatch }) => {
    // let token;
    // if (Platform.OS !== 'ios') {
    //   token = await messaging().getToken();  // Get the FCM token (Firebase Cloud Messaging token) for push notifications
    // }

    console.log('Login API Request:', {
      phone_number: phoneNumber,
      otp: otp,
      // fcm_token: token,
    });

    try {
      const result = await Axios.post(ApiEndpoints.auth.verifyOTP, {
        phone_number: phoneNumber,
        otp: otp,
        // fcm_token: token,
      });

      console.log('Login API Response:', result.data);

      if (result.data.status === 'ok') {
        const success = {
          userId: result.data.response.id,
          token: result.data.response.token.refresh,
          accessToken: result.data.response.token.access,
        };

        await createSession(success);
        return fulfillWithValue(success);  // Return the success action payload
      } else {
        return rejectWithValue(result.data.msg || 'Unknown error');  // Reject with a string message, not an Error object
      }
    } catch (error) {
      console.error('Login API Error:', error.response || error);
      const errorMessage = error.response?.data?.msg || 'Login failed';
      return rejectWithValue(errorMessage);  // Reject with a string message, not an Error object
    }
  }
);

export const register = createAsyncThunk(
  REGISTER,
  async (
    { fullName, password, confirmPassword, email, phoneNumber },
    { rejectWithValue, fulfillWithValue }
  ) => {
    let token;
    if (Platform.OS !== 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      token = await messaging().getToken();
    }

    console.log('Register API Request:', {
      name: fullName,
      password: password,
      password2: confirmPassword,
      email: email,
      phone_number: phoneNumber,
      fcm_token: token,
    });

    try {
      const result = await Axios.post(ApiEndpoints.auth.register, {
        name: fullName,
        password: password,
        password2: confirmPassword,
        email: email,
        phone_number: phoneNumber,
        fcm_token: token,
      });

      console.log('Register API Response:', result.data);

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
      console.error('Register API Error:', error);
      return rejectWithValue(new Error('Registration failed'));
    }
  }
);

export const generateOTP = createAsyncThunk(
  GENERATE_OTP_LOGIN,
  async ({ phoneNumber }, { rejectWithValue }) => {
    try {
      const result = await Axios.post(ApiEndpoints.auth.generateOTP, {
        phone_number: phoneNumber,
      });

      console.log('Register OTP API Response:', result.data);

      if (result?.data?.message === 'OTP sent successfully') {
        // Return the expected structure
        return { message: result.data.message };
      } else {
        return rejectWithValue({ message: result?.data?.msg || 'Failed to send OTP' });
      }
    } catch (error) {
      console.error('Register OTP API Error:', error);
      return rejectWithValue({ message: 'OTP generation failed' });
    }
  }
);

export const verifyOTP = createAsyncThunk(
  VERIFY_OTP_LOGIN,
  async ({ mobileNumber, code }, { rejectWithValue }) => {
    console.log('OTP Verify API Request:', {
      phone_number: mobileNumber,
      otp: code,
    });

    try {
      const result = await Axios.post(ApiEndpoints.auth.verifyOTP, {
        phone_number: mobileNumber,
        otp: code,
      });

      console.log('OTP Verify API Response:', result.data);

      // Check if the response has status 'ok'
      if (result?.data?.status === 'ok') {
        // Return user info and tokens if needed for further login or navigation
        return result.data.response;  // Return the full response data for use in your app
      } else {
        return rejectWithValue({ message: result?.data?.msg || 'OTP verification failed' });
      }
    } catch (error) {
      console.error('OTP Verify API Error:', error.response || error);
      return rejectWithValue({ message: error?.response?.data?.msg || 'OTP verification failed' });
    }
  }
);


const initialState = {
  isLoading: false,
  isOTPSent: false, // New state
  userId: null,
  token: null,
  accessToken: null,
  error: null,  // Add error state
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(generateOTP.fulfilled, (state, action) => {
      state.isOTPSent = true;  // OTP has been sent successfully
      state.isLoading = false;  // Set loading to false after OTP generation
    });
    builder.addCase(generateOTP.rejected, (state, action) => {
      state.isLoading = false;  // Set loading to false on failure
      state.error = action.payload?.message || 'OTP generation failed';
    });
    builder.addCase(verifyOTP.fulfilled, (state, action) => {
      state.isLoading = false;  // OTP verification completed
    });
    builder.addCase(verifyOTP.rejected, (state, action) => {
      state.isLoading = false;  // Set loading to false on failure
      state.error = action.payload?.message || 'OTP verification failed';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;  // Store refresh token
      state.accessToken = action.payload.accessToken;  // Store access token
      state.isLoading = false;  // Set loading to false after successful login
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Login failed';  // Use a string for error message
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;  // Store refresh token
      state.accessToken = action.payload.accessToken;  // Store access token
      state.isLoading = false;  // Set loading to false after registration
    });

    builder.addCase(restoreSession.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload?.token) {
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.accessToken = action.payload.accessToken;
      }
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
