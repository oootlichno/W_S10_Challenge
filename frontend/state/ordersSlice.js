import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    showAllOrders: true,
    orderList: [],
    filterSize: 'All', 
  },
  reducers: {
    toggleShowAllOrders: state => {
      state.showAllOrders = !state.showAllOrders;
    },
    setOrders: (state, action) => {
      state.orderList = action.payload;
    },
    toggleSizeFilter: (state, action) => {
      state.filterSize = action.payload;
    },
  },
});

export const { toggleShowAllOrders, setOrders, toggleSizeFilter } = ordersSlice.actions;

export default ordersSlice.reducer;


