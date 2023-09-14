import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';



import { ApiEndpoints } from '../../ApiEndPoints';
import { Axios } from '../../../lib/Axios';


export const GET_FOOD_TYPE = '/api/customer-profile';



export const getDataOnYourMind = createAsyncThunk(
  GET_FOOD_TYPE,
  async (_, thunkAPI) => {
    const result = await Axios.get(ApiEndpoints.categoryFoodType.foodType);
    if (result.data.status === 'ok') {
      return thunkAPI.fulfillWithValue(result.data.response);
    } else {
      return thunkAPI.rejectWithValue(new Error(result.data.msg));
    }
  },
);




export const categorySlice = createSlice({
  name: 'category',
  initialState: null,
  reducers: {},
  extraReducers: builder => { },
});

export const { } = categorySlice.actions;

export default categorySlice.reducer;
