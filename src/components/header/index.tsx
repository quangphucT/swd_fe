import { CiSearch } from "react-icons/ci";
import { Input } from "antd";
import "./index.scss";
import { TiUser } from "react-icons/ti";
import { BiSolidCart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import MegaMenu from "../navbar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import { LogoutOutlined } from "@ant-design/icons";
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
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
  return (
    <>
      <div className="header">
        <div className="header__left">
          <div className="logo" onClick={handleNavigateHomePage}>
            Cosmeceuticals
          </div>
        </div>
        <div className="header__middle">
          <Input placeholder="Tìm kiếm sản phẩm..." className="input" />
          <CiSearch className="search_icon" />
        </div>
        <div className="header__right">
          {isLoggedIn ? (
            <>
              <div className="profile-user" onClick={handleNavigateProfilePage}>
                <TiUser className="user_icon" size={47} />
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
          <div className="cart" onClick={handleNavigateCartPage}>
            <BiSolidCart className="cart_icon" />
            <p>Giỏ hàng</p>
          </div>
        </div>
      </div>
      <MegaMenu />
    </>
  );
};

export default Header;
