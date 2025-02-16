// import { configureStore } from '@reduxjs/toolkit'
// import userSlice from "./features/userSlice";

// export const store = configureStore({
//   reducer: {
//     user:userSlice
//   },
// })

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// luu tru state vo localStorage (ko mat data khi refresh trang)
// Cấu hình redux-persist
const persistConfig = {
  key: "user",
  version: 1,  // 🔹 Đảm bảo version >= 1
  storage, // luu tru trong localStorage
  whitelist: ["user"], // Chỉ lưu trạng thái `user`
};

// Tạo reducer có khả năng lưu trữ(bao quanh rootReducer de redux store luu tru) )
const persistedReducer = persistReducer(persistConfig, userReducer);

// Tạo store với persistedReducer // luu tru trang thai
export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

// Tạo persistor để quản lý state đã lưu
export const persistor = persistStore(store);

//
export type RootState = ReturnType<typeof store.getState>;