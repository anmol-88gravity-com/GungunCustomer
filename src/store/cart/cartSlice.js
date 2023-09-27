import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ApiEndpoints} from '../ApiEndPoints';
import {Axios} from '../../lib/Axios';

export const ADD_TO_CART = '/api/add-to-cart';
export const addToCart = createAsyncThunk(
  ADD_TO_CART,
  async ({dishId, storeId, price, quantity}, thunkAPI) => {
    const {userId} = thunkAPI.getState().auth;

    const res = await Axios.post('api/cards/', {
      user: userId,
    });
    if (res.data.status === 'ok') {
      const result = await Axios.post(ApiEndpoints.categoryFoodType.foodType, {
        user: userId,
        card: res.data.response.id,
        dish_id: dishId,
        store_id: storeId,
        price: price,
        quantity: quantity,
      });
      if (result.data.status === 'ok') {
        return thunkAPI.fulfillWithValue(result.data.response);
      } else {
        return thunkAPI.rejectWithValue(new Error(result.data.msg));
      }
    } else {
      return thunkAPI.rejectWithValue(new Error(res.data.msg));
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
