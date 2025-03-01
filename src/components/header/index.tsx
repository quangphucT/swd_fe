import { CiSearch } from "react-icons/ci";
import { Button, Input } from "antd";
import "./index.scss";
import { TiUser } from "react-icons/ti";
import { BiSolidCart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import MegaMenu from "../navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import { LogoutOutlined } from "@ant-design/icons";
import { formatMoneyToVND } from "../../currency/currency";
import { toast } from "react-toastify";
import api from "../../config/api";
import { RootState } from "../../redux/store";
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const [balance, setBalance] = useState(null)
  const [dataCart, setDataCart] = useState([])
  const dispatch = useDispatch();
  useEffect(() => {
    // Kiểm tra xem có token hay không (hoặc gọi API xác thực)
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Nếu có token => đã đăng nhập
  }, []);
  const navigate = useNavigate();
  const handleNavigateLoginPage = () => {
    navigate("/login");
  };
  const handleNavigateHomePage = () => {
    navigate("/");
  };
  const handleNavigateCartPage = () => {
    navigate("/cart");
  };
  const handleNavigateProfilePage = () => {
    navigate("/my-account/profile");
  };
  const fetchWallet = async () => {
    try {
      const response = await api.get("Wallet")
      setBalance(response.data.amountofMoney)
    } catch (error) {
      toast.error("Error while fetching")
    }
  }
  // const cartId = localStorage.getItem("cartId")
  // const fetchCart = async () => {
  //   try {
     
  //     const response = await api.get(`/cart/${cartId}`)
  //     setDataCart(response.data)
  //   } catch (error) {
  //     toast.error("Error while fetching !!")
  //   }
  // }
  useEffect(() => {
    fetchWallet();
  }, [])

  // useEffect(() => {
  //   fetchCart();
  // }, [cartId])
  return (
    <>
      <div className="header">
        <div className="header__left">
          <div className="logo" onClick={handleNavigateHomePage}>
            Cosmeceuticals
          </div>

          <div className="blog" style={{ fontSize: '18px', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => { navigate("/blog") }}>
            Blogs/ Tin tức
          </div>
        </div>
        {/* <div className="header__middle"> */}
        {/* <Input placeholder="Tìm kiếm sản phẩm..." className="input" />
          <CiSearch className="search_icon" /> */}
        {/* <Button>Nạp tiền vào v</Button>
        </div> */}
        <div className="header__right">
          {isLoggedIn ? (
            <>
              <div style={{ border: '2px solid #fff', borderRadius: '50%' }} className="profile-user" onClick={handleNavigateProfilePage}>
                <TiUser className="user_icon" size={47} />
              </div>
              <div className="current-balance">
                <p className="balance-text">
                  Số dư ví: <span className="balance-amount">{formatMoneyToVND(balance)}</span>
                </p>
              </div>

              <div
                className="logout"
                onClick={() => {
                  dispatch(logout());
                  localStorage.removeItem("token"); // Xóa token khi đăng xuất
                  setIsLoggedIn(false);
                  navigate("/login");
                }}
              >
                <LogoutOutlined className="logout-icon " />
                <p>Đăng xuất</p>
              </div>
            </>
          ) : (
            <div className="login" onClick={handleNavigateLoginPage}>
              <TiUser className="user_icon" />
              <p>Đăng nhập / Đăng ký</p>
            </div>
          )}
          <div className="cart" >
            <BiSolidCart onClick={handleNavigateCartPage} className="cart_icon" />
            {dataCart.length > 0 ? <p style={{ color: 'blue', fontWeight: 'bold' }}>{dataCart.length} Sản phẩm</p> : <p style={{ color: 'blue', fontWeight: 'bold' }}>0</p>}

            <Button onClick={() => { navigate("/deposite") }} className="wallet-button">Nạp tiền vào ví</Button>
          </div>

        </div>
      </div>
      <MegaMenu />
    </>
  );
};

export default Header;
