import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import { apiSlice } from "./slices/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddlewaree) =>
    getDefaultMiddlewaree().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
