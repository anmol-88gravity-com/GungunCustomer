import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ApiEndpoints} from '../ApiEndPoints';
import {Axios} from '../../lib/Axios';

// export const getAllAddresses

export const addressSlice = createSlice({
  name: 'address',
  initialState: null,
  reducers: {},
  extraReducers: builder => {},
});

export const {} = addressSlice.actions;

export default addressSlice.reducer;
