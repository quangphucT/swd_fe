import { createContext, useState, useContext, useEffect } from "react";
import api from "../../config/api";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";

// 1️⃣ Tạo Context
const CartContext = createContext(null);

// 2️⃣ Tạo Provider để bọc App

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    const [balance, setBalance] = useState(null);
    const cartId = useSelector((store: RootState) => store.user.user.cartId)
    const fetchCartCount = async () => {
        try {
            const response = await api.get(`/cart/${cartId}`); // API lấy giỏ hàng
            setCartCount(response.data.length);
        } catch (error) {
            console.error("Lỗi khi lấy giỏ hàng!");
        }
    };
    const fetchWallit = async () => {
        try {
            const response = await api.get("Wallet");
            setBalance(response.data.amountofMoney);
        } catch (error) {
            toast.error("Lỗi khi lấy số dư!");
        }
    };

    useEffect(() => {
        fetchWallit();
        fetchCartCount(); // Gọi API khi App chạy
    }, []);

    return (
        <CartContext.Provider value={{ cartCount,balance, setBalance, setCartCount, fetchCartCount, fetchWallit }}>
            {children}
        </CartContext.Provider>
    );
};

// 3️⃣ Tạo custom hook để sử dụng dễ dàng
export const useCart = () => useContext(CartContext);
