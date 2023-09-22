import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiEndpoints } from '../ApiEndPoints';
import { Axios } from '../../lib/Axios';



export const GET_RESTURANT_DETAILS = '/api/restaurant';


export const getResturantDetails = createAsyncThunk(
  GET_RESTURANT_DETAILS,
  async (_, thunkAPI) => {
    const { storeId } = thunkAPI.getState().auth;
    console.log('getReDetail-id-',storeId)
    const result = await Axios.get(
      ApiEndpoints.resturantDetail.resturantDetails.replace('STORE_ID', String(10)),
    );
    console.log('getRestDetail--',result)
    if (result.data.status === 'ok') {
      return thunkAPI.fulfillWithValue(result.data.response);
    } else {
      return thunkAPI.rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const resturantDetailsSlice = createSlice({
  name: 'resturant',
  initialState: null,
  reducers: {},
  extraReducers: builder => { },
});

export const { } = resturantDetailsSlice.actions;

export default resturantDetailsSlice.reducer;
