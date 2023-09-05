import {combineReducers} from '@reduxjs/toolkit';
import authReducer, {AUTH_LOGOUT} from './auth/authSlice';

const combinedReducer = combineReducers({
  auth: authReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === `${AUTH_LOGOUT}/fulfilled`) {
    state = undefined;
  }
  return combinedReducer(state, action);
};
