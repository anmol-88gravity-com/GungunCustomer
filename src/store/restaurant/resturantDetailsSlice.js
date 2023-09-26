import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ApiEndpoints} from '../ApiEndPoints';
import {Axios} from '../../lib/Axios';

export const GET_RESTAURANT_DETAILS = '/api/restaurant';

export const getRestaurantDetails = createAsyncThunk(
  GET_RESTAURANT_DETAILS,
  async ({restaurantId}, thunkAPI) => {
    const result = await Axios.get(
      ApiEndpoints.resturantDetail.resturantDetails.replace(
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

export const restaurantDetailsSlice = createSlice({
  name: 'restaurant',
  initialState: null,
  reducers: {},
  extraReducers: builder => {},
});

export const {} = restaurantDetailsSlice.actions;

export default restaurantDetailsSlice.reducer;
