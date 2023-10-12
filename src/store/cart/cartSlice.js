import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ApiEndpoints} from '../ApiEndPoints';
import {Axios} from '../../lib/Axios';
import {load, remove, save} from '../../utils/storage';
import Config from '../../config';

export const CREATE_CART = '/api/create-cart';
export const ADD_TO_CART = '/api/add-to-cart';
export const GET_CART_ITEMS = '/api/cards/list';
export const INCREASE_QUANTITY = '/api/card-items/increase-quantity';
export const DECREASE_QUANTITY = '/api/card-items/decrease-quantity';
export const BILL_SUMMARY = '/api/bill-summary';
export const DELETE_CART = '/api/delete-cart';

export const createCart = createAsyncThunk(CREATE_CART, async (_, thunkAPI) => {
  const {userId} = thunkAPI.getState().auth;

  const res = await Axios.post(ApiEndpoints.cart.createCart, {
    user: userId,
  });
  if (res.data.status === 'ok') {
    await save(Config.CART_ID, res.data.response.id);
    return thunkAPI.fulfillWithValue(res.data.response.id);
  } else {
    return thunkAPI.rejectWithValue(new Error(res.data.msg));
  }
});

export const addToCart = createAsyncThunk(
  ADD_TO_CART,
  async ({dishId, storeId, price, quantity, cart}, thunkAPI) => {
    const {userId} = thunkAPI.getState().auth;
    const result = await Axios.post(ApiEndpoints.cart.addCartItem, {
      user: userId,
      card: cart,
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
  async ({cartId}, thunkAPI) => {
    const result = await Axios.get(
      ApiEndpoints.cart.getCartItems.replace('DISH_ITEM_ID', String(cartId)),
    );
    if (result.data.status === 'ok') {
      return thunkAPI.fulfillWithValue(result.data.response.items);
    } else {
      return thunkAPI.rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const increaseItemQuantity = createAsyncThunk(
  INCREASE_QUANTITY,
  async ({itemId}, thunkAPI) => {
    const result = await Axios.put(ApiEndpoints.cart.increaseQuantity, {
      card_item_id: itemId,
    });
    if (result.data.status === 'ok') {
      return thunkAPI.fulfillWithValue(itemId);
    } else {
      return thunkAPI.rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const deleteCart = createAsyncThunk(DELETE_CART, async (_, thunkAPI) => {
  const cartId = await load(Config.CART_ID);
  const result = await Axios.delete(
    ApiEndpoints.cart.deleteCart.replace('CART_ID', String(cartId)),
  );
  console.log('result.data', result.data);
  if (result.data.status === 'ok') {
    await remove(Config.CART_ID);
    return true;
  } else {
    return thunkAPI.rejectWithValue(new Error(result.data.msg));
  }
});

export const decreaseItemQuantity = createAsyncThunk(
  DECREASE_QUANTITY,
  async ({itemId}, thunkAPI) => {
    const result = await Axios.put(ApiEndpoints.cart.decreaseQuantity, {
      card_item_id: itemId,
    });
    if (result.data.status === 'ok') {
      return thunkAPI.fulfillWithValue(itemId);
    } else {
      return thunkAPI.rejectWithValue(new Error(result.data.msg));
    }
  },
);
export const billSummary = createAsyncThunk(
  BILL_SUMMARY,
  async (_, thunkAPI) => {
    const result = await Axios.get(ApiEndpoints.cart.billSummary);
    if (result.data.status === 'ok') {
      return thunkAPI.fulfillWithValue(result.data.response);
    } else {
      return thunkAPI.rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {cartId: null, cartList: [], itemId: null},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createCart.fulfilled, (state, action) => {
      state.cartId = action.payload;
    });
    builder.addCase(getDataCartItems.fulfilled, (state, action) => {
      state.cartList = action.payload;
    });
    builder.addCase(increaseItemQuantity.fulfilled, (state, action) => {
      const index = state.cartList.findIndex(i => i.item_id === action.payload);
      if (index > -1) {
        state.cartList[index].quantity = state.cartList[index].quantity + 1;
      }
    });
    builder.addCase(decreaseItemQuantity.fulfilled, (state, action) => {
      const index = state.cartList.findIndex(i => i.item_id === action.payload);
      if (index > -1) {
        if (state.cartList[index].quantity === 1) {
          state.cartList.splice(index, 1);
          if (state.cartList.length === 0) {
            deleteCart();
          }
        } else {
          state.cartList[index].quantity = state.cartList[index].quantity - 1;
        }
      }
    });
  },
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
