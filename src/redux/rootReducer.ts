import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
// luu tru nhieu slice nhu userSlice, productSlice, cartSlice,V.V.V
const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
