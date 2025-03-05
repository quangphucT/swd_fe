import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addCartData: (state, action) => {
        return action.payload
        },
       
        addProductToCart: (state, action) => {
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
                existingItem.quantity += action.payload.quantity;
            } else {
                // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng
                state.push(action.payload);
            }
        },
        deleteProductInRedux: (state, action: PayloadAction<number>) => {
            return state.filter(item => item.id !== action.payload);
        },
        resetCart: () => []
    }
})
export const {addCartData, addProductToCart, deleteProductInRedux, resetCart} = cartSlice.actions;
export default cartSlice.reducer;