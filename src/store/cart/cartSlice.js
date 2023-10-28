import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ApiEndpoints} from '../ApiEndPoints';
import {Axios} from '../../lib/Axios';
import {load, remove, save} from '../../utils/storage';
import Config from '../../config';
import moment from 'moment';

export const CREATE_CART = '/api/create-cart';
export const GET_RESTAURANT_DETAILS = '/api/restaurant';
export const ADD_TO_CART = '/api/add-to-cart';
export const GET_CART_ITEMS = '/api/cards/list';
export const INCREASE_QUANTITY = '/api/card-items/increase-quantity';
export const DECREASE_QUANTITY = '/api/card-items/decrease-quantity';
export const BILL_SUMMARY = '/api/bill-summary';
export const DELETE_CART = '/api/delete-cart';

export const getRestaurantDetails = createAsyncThunk(
  GET_RESTAURANT_DETAILS,
  async ({restaurantId}, thunkAPI) => {
    const result = await Axios.get(
      ApiEndpoints.restaurantDetail.restaurantDetails.replace(
        'STORE_ID',
        String(restaurantId),
      ),
    );
    if (result.data.status === 'ok') {
      return thunkAPI.fulfillWithValue(result.data.response);
    } else {
      return thunkAPI.rejectWithValue(new Error(result.data.msg));
    }
  },
);

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
  async (
    {dishItemId, storeId, price, quantity, cart, categoryItemName},
    thunkAPI,
  ) => {
    const {userId} = thunkAPI.getState().auth;
    const result = await Axios.post(ApiEndpoints.cart.addCartItem, {
      user: userId,
      card: cart,
      dish_id: dishItemId,
      store_id: storeId,
      price: price,
      quantity: quantity,
    });
    if (result.data.status === 'ok') {
      await save(Config.CART_ID, result.data.response.card);
      const cartItem = {
        item_id: result.data.response.id,
        dish_id: result.data.response.dish_id,
        dish_name: result.data.response.dish_name,
        dish_image: result.data.response.dish_image,
        dish_type: result.data.response.dish_type,
        store_id: result.data.response.store_id,
        added_at: moment(new Date()).format('YYYY-MM-DD HH-mm-ss a'),
        price: result.data.response.price,
        quantity: result.data.response.quantity,
        category_id: result.data.response.category_id,
        category_name: result.data.response.category_name,
      };
      return thunkAPI.fulfillWithValue({
        user: userId,
        categoryName: categoryItemName,
        dishItemId: dishItemId,
        quantity: quantity,
        cartItem: cartItem,
      });
    } else {
      return thunkAPI.rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const getDataCartItems = createAsyncThunk(
  GET_CART_ITEMS,
  async (_, thunkAPI) => {
    const {userId} = thunkAPI.getState().auth;
    const result = await Axios.get(
      ApiEndpoints.cart.getCartItems.replace('USER_ID', String(userId)),
    );
    if (result.data.status === 'ok') {
      return thunkAPI.fulfillWithValue(result.data.response.items);
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
  if (result.data.status === 'ok') {
    await remove(Config.CART_ID);
    return true;
  } else {
    return thunkAPI.rejectWithValue(new Error(result.data.msg));
  }
});

export const increaseItemQuantity = createAsyncThunk(
  INCREASE_QUANTITY,
  async ({itemId, cartItemId, itemCategoryName}, thunkAPI) => {
    const result = await Axios.put(ApiEndpoints.cart.increaseQuantity, {
      card_item_id: cartItemId,
    });
    if (result.data.status === 'ok') {
      return thunkAPI.fulfillWithValue({
        itemId: itemId,
        cartItemId: cartItemId,
        itemCategoryName: itemCategoryName,
      });
    } else {
      return thunkAPI.rejectWithValue(new Error(result.data.msg));
    }
  },
);

export const decreaseItemQuantity = createAsyncThunk(
  DECREASE_QUANTITY,
  async ({itemId, cartItemId, itemCategoryName}, thunkAPI) => {
    const result = await Axios.put(ApiEndpoints.cart.decreaseQuantity, {
      card_item_id: cartItemId,
    });
    if (result.data.status === 'ok') {
      if (result.data.response.CartList.length === 0) {
        deleteCart();
      }
      return thunkAPI.fulfillWithValue({
        itemId: itemId,
        cartItemId: cartItemId,
        itemCategoryName: itemCategoryName,
      });
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
  initialState: {
    cartId: null,
    cartList: [],
    itemId: null,
    restaurantDetails: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      const {categoryName, dishItemId, quantity, cartItem} = action.payload;
      state?.cartList?.push(cartItem);

      const index = state.restaurantDetails.menu.findIndex(
        s => s.category_name === categoryName,
      );
      if (index > -1) {
        const a = state.restaurantDetails.menu[index].dishes.findIndex(
          x => x.id === dishItemId,
        );
        if (a > -1) {
          state.restaurantDetails.menu[index].dishes[a].added_to_cart = true;
          state.restaurantDetails.menu[index].dishes[a].quantity_in_cart =
            quantity;
        }
      }
    });
    builder.addCase(getRestaurantDetails.fulfilled, (state, action) => {
      state.restaurantDetails = action.payload;
    });
    builder.addCase(createCart.fulfilled, (state, action) => {
      state.cartId = action.payload;
    });
    builder.addCase(getDataCartItems.fulfilled, (state, action) => {
      const a = action.payload.map(m => m.items);
      state.cartList = a.flat();
    });
    builder.addCase(increaseItemQuantity.fulfilled, (state, action) => {
      const {itemId, cartItemId, itemCategoryName} = action.payload;

      const index = state.cartList.findIndex(i => i.item_id === cartItemId);
      if (index > -1) {
        state.cartList[index].quantity = state.cartList[index].quantity + 1;
      }

      const val = state.restaurantDetails.menu.findIndex(
        s => s.category_name === itemCategoryName,
      );
      if (val > -1) {
        const a = state.restaurantDetails.menu[val].dishes.findIndex(
          x => x.id === itemId,
        );
        if (a > -1) {
          state.restaurantDetails.menu[val].dishes[a].quantity_in_cart =
            state.restaurantDetails.menu[val].dishes[a].quantity_in_cart + 1;
        }
      }
    });
    builder.addCase(decreaseItemQuantity.fulfilled, (state, action) => {
      const {itemId, cartItemId, itemCategoryName} = action.payload;

      const index = state.cartList.findIndex(i => i.item_id === cartItemId);
      if (index > -1) {
        if (state.cartList[index].quantity === 1) {
          state.cartList.splice(index, 1);
        } else {
          state.cartList[index].quantity = state.cartList[index].quantity - 1;
        }
      }

      const val = state.restaurantDetails.menu.findIndex(
        s => s.category_name === itemCategoryName,
      );
      if (val > -1) {
        const a = state.restaurantDetails.menu[val].dishes.findIndex(
          x => x.id === itemId,
        );
        if (a > -1) {
          if (
            state.restaurantDetails.menu[val].dishes[a].quantity_in_cart === 1
          ) {
            state.restaurantDetails.menu[val].dishes[a].added_to_cart = false;
            state.restaurantDetails.menu[val].dishes[a].quantity_in_cart = 0;
          } else {
            state.restaurantDetails.menu[val].dishes[a].quantity_in_cart =
              state.restaurantDetails.menu[val].dishes[a].quantity_in_cart - 1;
          }
        }
      }
    });
  },
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
