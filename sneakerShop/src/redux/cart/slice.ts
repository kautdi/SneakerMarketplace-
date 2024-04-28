import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartSliceState } from './types';
import { fetchCartItem, fetchTotalPricing } from './asyncAction';



const initialState: CartSliceState = {
    totalPrice: 0,
    items: [],
    count:0,
  };
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTotalPricing.pending, (state) => {
      state.totalPrice = 0;
    });
    builder.addCase(fetchTotalPricing.fulfilled, (state, action) => {
        state.totalPrice =  action.payload;
    });
    builder.addCase(fetchTotalPricing.rejected, (state) => {
        state.totalPrice = 0;
    });
    builder.addCase(fetchCartItem.pending, (state) => {
      state.items = [];
      state.count = 0
    });
    builder.addCase(fetchCartItem.fulfilled, (state, action) => {
        state.items =  action.payload;
        state.count = state.items.length;
    });
    builder.addCase(fetchCartItem.rejected, (state) => {
        state.items = [];
        state.count = 0
    });
  },
});


export default cartSlice.reducer;
