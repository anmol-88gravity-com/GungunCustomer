import {combineReducers} from '@reduxjs/toolkit';
import authReducer, {AUTH_LOGOUT} from './auth/authSlice';
import userReducer from './user/userSlice';
import forgotPasswordReducer from './auth/forgotPasswordSlice';

const combinedReducer = combineReducers({
  auth: authReducer,
  forgotPassword: forgotPasswordReducer,
  user: userReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === `${AUTH_LOGOUT}/fulfilled`) {
    state = undefined;
  }
  return combinedReducer(state, action);
};
