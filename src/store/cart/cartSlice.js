import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ApiEndpoints} from '../ApiEndPoints';
import {Axios} from '../../lib/Axios';

export const CREATE_CART = '/api/create-cart';
export const ADD_TO_CART = '/api/add-to-cart';
export const GET_CART_ITEMS = '/api/cards/list';
export const INCREASE_QUANTITY = '/api/card-items/increase-quantity';
export const DECREASE_QUANTITY = '/api/card-items/decrease-quantity';

export const createCart = createAsyncThunk(CREATE_CART, async (_, thunkAPI) => {
  const {userId} = thunkAPI.getState().auth;

  const res = await Axios.post(ApiEndpoints.cart.createCart, {
    user: userId,
  });
  if (res.data.status === 'ok') {
    return thunkAPI.fulfillWithValue(res.data.response.id);
  } else {
    return thunkAPI.rejectWithValue(new Error(res.data.msg));
  }
});

export const addToCart = createAsyncThunk(
  ADD_TO_CART,
  async ({dishId, storeId, price, quantity}, thunkAPI) => {
    const {userId} = thunkAPI.getState().auth;
    const {cartId} = thunkAPI.getState().cart;

    console.log(
      'dishId, storeId, price, quantity',
      dishId,
      storeId,
      price,
      quantity,
    );
    const result = await Axios.post(ApiEndpoints.cart.addCartItem, {
      user: userId,
      card: cartId,
      dish_id: dishId,
      store_id: storeId,
      price: price,
      quantity: quantity,
    });
    if (result.data.status === 'ok') {
      return thunkAPI.fulfillWithValue(result.data.response.card);
    } else {
      return thunkAPI.rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const getDataCartItems = createAsyncThunk(
  GET_CART_ITEMS,
  async (_, thunkAPI) => {
    const result = await Axios.get(
      ApiEndpoints.cart.getCartItems.replace('DISH_ITEM_ID', String(68)),
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
  async ({item_id}, thunkAPI) => {
    console.log('item_id', item_id);
    const result = await Axios.put(ApiEndpoints.cart.increaseQuantity, {
      card_item_id: item_id,
    });
    if (result.data.status === 'ok') {
      return thunkAPI.fulfillWithValue(result.data.response);
    } else {
      return thunkAPI.rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const decreaseItemQuantity = createAsyncThunk(
  DECREASE_QUANTITY,
  async ({item_id}, thunkAPI) => {
    const result = await Axios.put(ApiEndpoints.cart.decreaseQuantity, {
      card_item_id: item_id,
    });
    if (result.data.status === 'ok') {
      return thunkAPI.fulfillWithValue(result.data.response);
    } else {
      return thunkAPI.rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {cartId: null},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createCart.fulfilled, (state, action) => {
      state.cartId = action.payload;
    });
  },
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
