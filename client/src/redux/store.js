import { configureStore } from "@reduxjs/toolkit";
import rootreducer from "./reducer";
export const store = configureStore({
  reducer: rootreducer,
});
