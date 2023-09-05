import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ApiEndpoints} from '../ApiEndPoints';
import {Axios} from '../../lib/Axios';
import Config from '../../config';
import {load, remove, save} from '../../utils/storage';

export const AUTH_LOGOUT = '/api/auth/logout';
export const AUTH_RESTORE = '/api/auth/restore';
// export const REGISTER = '/auth/register';
export const LOGIN = '/auth/login';

const createSession = async payload => {
  await save(Config.USER_SESSION, payload);
};

export const restoreSession = createAsyncThunk(AUTH_RESTORE, async () => {
  const result = await load(Config.USER_SESSION);
  if (result) {
    return String(result);
  }
});

export const logout = createAsyncThunk(AUTH_LOGOUT, async () => {
  await remove(Config.USER_SESSION);
  return true;
});

// export const register = createAsyncThunk(
//   REGISTER,
//   async (
//     {name, password, confirmPassword, phoneNo, email},
//     {rejectWithValue, fulfillWithValue},
//   ) => {
//     const result = await Axios.post(ApiEndpoints.auth.register, {
//       email: email,
//       name: name,
//       phone_number: phoneNo,
//       password: password,
//       password2: confirmPassword,
//     });
//     if (result.data.status === 'ok') {
//       const success = {
//         userId: result.data.response.id,
//         token: result.data.response.token.refresh,
//         accessToken: result.data.response.token.access,
//       };
//
//       await createSession(success);
//       return fulfillWithValue(success);
//     } else {
//       return rejectWithValue(new Error(result.data.msg));
//     }
//   },
// );

export const login = createAsyncThunk(
  LOGIN,
  async ({phoneNumber, password}, {rejectWithValue, fulfillWithValue}) => {
    const result = await Axios.post(ApiEndpoints.auth.login, {
      phone_number: phoneNumber,
      password: password,
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

    // builder.addCase(register.fulfilled, (state, action) => {
    //   state.userId = action.payload.userId;
    //   state.token = action.payload.token;
    //   state.accessToken = action.payload.accessToken;
    // });

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

export const {} = authSlice.actions;

export default authSlice.reducer;
