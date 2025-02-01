import { CiSearch } from "react-icons/ci";
import { Input } from 'antd'
import './index.scss'
import { TiUser } from "react-icons/ti";
import { BiSolidCart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
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
      <div className="header__bottom">
        <p>Chăm sóc da mặt</p>
        <p>Chăm sóc tóc - da dầu</p>
        <p>Chăm sóc cơ thể</p>
        <p>Giải pháp làn da</p>
        <p>Chăm sóc da vùng mắt</p>
        <p>Sản phẩm từ tự nhiên</p>
        <p>Mỹ phẩm trang điểm</p>
      </div>
    </>
  )
}

export default Header
