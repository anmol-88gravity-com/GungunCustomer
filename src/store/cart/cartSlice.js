import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ApiEndpoints} from '../ApiEndPoints';
import {Axios} from '../../lib/Axios';

export const ADD_TO_CART = '/api/add-to-cart';

export const addToCart = createAsyncThunk(
  ADD_TO_CART,
  async ({dishId, storeId, price, quantity}, thunkAPI) => {
    const {userId} = thunkAPI.getState().auth;

    console.log(
      'dishId, storeId, price, quantity',
      dishId,
      storeId,
      price,
      quantity,
    );

    const res = await Axios.post(ApiEndpoints.cart.createCart, {
      user: userId,
    });
    if (res.data.status === 'ok') {
      console.log('res.data.response.id', res.data.response.id);
      thunkAPI.fulfillWithValue({cartId: res.data.response.id});
      const result = await Axios.post(ApiEndpoints.cart.addCartItem, {
        user: userId,
        card: res.data.response.id,
        dish_id: dishId,
        store_id: storeId,
        price: price,
        quantity: quantity,
      });
      if (result.data.status === 'ok') {
        console.log('neha', result.data.response);
        return true;
      } else {
        return thunkAPI.rejectWithValue(new Error(result.data.msg));
      }
    } else {
      return thunkAPI.rejectWithValue(new Error(res.data.msg));
    }
  },
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState: null,
  reducers: {},
  extraReducers: builder => {},
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
