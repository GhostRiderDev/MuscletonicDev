import routinesReducer from "@/reducers/routinesReducer";
import userReducer from "@/reducers/userReducer";
import { configureStore } from "@reduxjs/toolkit";
import { UseSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    routines: routinesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppSelector = UseSelector;
