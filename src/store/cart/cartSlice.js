import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ApiEndpoints} from '../ApiEndPoints';
import {Axios} from '../../lib/Axios';

export const ADD_TO_CART = '/api/add-to-cart';
export const GET_CART_ITEMS = '/api/cards/list';
export const INCREASE_QUANTITY = '/api/card-items/increase-quantity';
export const DECREASE_QUANTITY = '/api/card-items/decrease-quantity';

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


export const getDataCartItems = createAsyncThunk(
  GET_CART_ITEMS,
  async (_, thunkAPI) => {
    const result = await Axios.get(
      ApiEndpoints.cart.getCartItems.replace(
        'DISH_ITEM_ID',
        String(5),
      ),
    );
    if (result.data.status === 'ok') {
      return thunkAPI.fulfillWithValue(result.data.response);
    } else {
      return thunkAPI.rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const increaseItemQuantity = createAsyncThunk(
  INCREASE_QUANTITY,
  async (_, thunkAPI) => {
    const result = await Axios.put(ApiEndpoints.cart.increaseQuantity);
    console.log('increaseItem--',result?.data)
    if (result.data.status === 'ok') {
      return thunkAPI.fulfillWithValue(result.data.response);
    } else {
      return thunkAPI.rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const decreaseItemQuantity = createAsyncThunk(
  DECREASE_QUANTITY,
  async (_, thunkAPI) => {
    const result = await Axios.put(ApiEndpoints.cart.decreaseQuantity);
    console.log('decreaseItem--',result?.data)
    if (result.data.status === 'ok') {
      return thunkAPI.fulfillWithValue(result.data.response);
    } else {
      return thunkAPI.rejectWithValue(new Error(result.data.msg));
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
