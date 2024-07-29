import { configureStore } from '@reduxjs/toolkit'
import ordersReducer from './ordersSlice';
import { ordersApi } from './ordersApi';


export const resetStore = () => configureStore({
  reducer: {
    ordersState: ordersReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: getDefault => getDefault().concat(
    ordersApi.middleware,
  ),
})

export const store = resetStore()