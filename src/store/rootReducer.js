import {combineReducers} from '@reduxjs/toolkit';
import authReducer, {AUTH_LOGOUT} from './auth/authSlice';
import userReducer from './user/userSlice';
import addressReducer from './address/addressSlice';
import forgotPasswordReducer from './auth/forgotPasswordSlice';
import homeReducer from './home/homeSlice';
import cartReducer from './cart/cartSlice';

const combinedReducer = combineReducers({
  auth: authReducer,
  forgotPassword: forgotPasswordReducer,
  user: userReducer,
  address: addressReducer,
  home: homeReducer,
  cart: cartReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === `${AUTH_LOGOUT}/fulfilled`) {
    state = undefined;
  }
  return combinedReducer(state, action);
};
