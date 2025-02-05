import { CiSearch } from "react-icons/ci";
import { Input } from 'antd'
import './index.scss'
import { TiUser } from "react-icons/ti";
import { BiSolidCart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import MegaMenu from "../navbar";
const Header = () => {
  const navigate = useNavigate();
  const handleNavigateLoginPage = () => {
    navigate("/login")
  }
  const handleNavigateHomePage = () => {
    navigate("/")
  }
  const handleNavigateCartPage = () => {
    navigate("/cart")
  }
  return (
    <>
      <div className='header'>
        <div className="header__left">
          <div className="logo" onClick={handleNavigateHomePage}>
            Cosmeceuticals
          </div>
        </div>
        <div className="header__middle">
          <Input placeholder="Tìm kiếm sản phẩm..." className='input' />
          <CiSearch className="search_icon" />
        </div>
        <div className="header__right">
          <div className="login" onClick={handleNavigateLoginPage}>
            <TiUser className="user_icon" />
            <p>Đăng nhập / Đăng ký</p>
          </div>
          <div className="cart" onClick={handleNavigateCartPage}>
            <BiSolidCart className="cart_icon" />
            <p>Giỏ hàng</p>
          </div>
        </div>
      </div>
      <MegaMenu />
    </>
  )
}

export default Header
