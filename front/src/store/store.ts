import userReducer from "@/reducers/userReducer";
import { configureStore } from "@reduxjs/toolkit";
import { UseSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppSelector = UseSelector;
