import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ApiEndpoints} from '../ApiEndPoints';
import {Axios} from '../../lib/Axios';

export const GET_FOOD_TYPE = '/api/customer-profile';
export const SEARCH_QUERY = '/api/search-query';

export const getDataOnYourMind = createAsyncThunk(
  GET_FOOD_TYPE,
  async (_, thunkAPI) => {
    const result = await Axios.get(ApiEndpoints.categoryFoodType.foodType);
    console.log('foodData---',result)
    if (result.data.status === 'ok') {
      return thunkAPI.fulfillWithValue(result.data.response);
    } else {
      return thunkAPI.rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const getSearchResults = createAsyncThunk(
  SEARCH_QUERY,
  async ({search}, thunkAPI) => {
    const result = await Axios.get(ApiEndpoints.home.searchQuery, {
      params: {q: search},
    });
    if (result.data.status === 'ok') {
      return thunkAPI.fulfillWithValue(result.data.stores);
    } else {
      return thunkAPI.rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const homeSlice = createSlice({
  name: 'home',
  initialState: null,
  reducers: {},
  extraReducers: builder => {},
});

export const {} = homeSlice.actions;

export default homeSlice.reducer;
