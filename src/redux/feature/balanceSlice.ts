import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 🔹 Giá trị khởi tạo là số dư (mặc định = 0)
const initialState: number = 0;

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    deposit: (state, action: PayloadAction<number>) => {
      return action.payload; // ✅ Lưu số tiền mới
    },
    addBalance: (state, action: PayloadAction<number>) => {
        return state + action.payload;
      },
    resetBalance: () => initialState, // ✅ Reset về 0
  },
});

export const { deposit, resetBalance, addBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
