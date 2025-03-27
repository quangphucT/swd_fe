
import { Button, Badge, Dropdown, Menu, Image } from "antd";
import { TiUser } from "react-icons/ti";
import { BiSolidCart } from "react-icons/bi";
import { LogoutOutlined, WalletOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


import { formatMoneyToVND } from "../../currency/currency";
import { toast } from "react-toastify";
import api from "../../config/api";
import MegaMenu from "../navbar";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { removeInformation } from "../../redux/feature/userSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { resetBalance } from "../../redux/feature/balanceSlice";
import { addCartData, resetCart } from "../../redux/feature/cartSlice";
import { removeResultQuizId } from "../../redux/feature/resultquizSlice";





const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const cartId = useSelector((store: RootState) => store.user?.user?.cartId)


  // lấy ra role của user

  const role = useSelector((store: RootState) => store.user?.user.roles[0])
  const token = localStorage.getItem("token")
  const user = useSelector((store: RootState) => store.user)
  console.log("Role:", role)
  const balanceAccountFromRedux = useSelector((store: RootState) => store.balance)
  const [image, setImage] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);





  const fetchCart = async () => {
    try {
      const response = await api.get(`/cart/${cartId}`);
      dispatch(addCartData(response.data))
    } catch (error) {
      toast.error("Lỗi khi lấy giỏ hàng!");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {

      fetchCart();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {

    localStorage.removeItem("token");
    dispatch(removeInformation())
    dispatch(resetBalance())
    dispatch(resetCart())
    dispatch(removeResultQuizId())
    setIsLoggedIn(false);
    navigate("/");
  };
  const cartFromRedux = useSelector((store: RootState) => store.cart)
  // getcurrent account
  const userId = useSelector((store: RootState) => store.user?.user?.id)
  const fetchCurrentAccount = async () => {
    try {
      if (userId) {
        const response = await api.get("Accounts/GetCurrentAccount")
        setImage(response.data.avatar)
      }

    } catch (error) {
      toast.error("error")
    }
  }
  useEffect(() => {
    fetchCurrentAccount()
  }, [])
  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate("/my-account/profile")}>
        <TiUser size={20} style={{ marginRight: 8 }} />
        Trang cá nhân
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined style={{ marginRight: 8 }} />
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="header">
        {/* Logo & Blog */}
        <div className="header__left">
          <div className="logo" onClick={() => navigate("/")}>CosmeCare</div>
  
          {token ? <div className="blog" onClick={() => navigate("/shopping")}>Mua sắm</div> : <div className="blog" onClick={() => navigate("/login")}>Shopping</div>}

          {user && (
            <>
              {role !== "Doctor" && (<>
                <div className="blog" onClick={() => navigate("/booking-page")}>Đặt lịch tư vấn</div>
                <div className="blog" onClick={() => navigate("/booking-takecare")}>Điều trị chuyên sâu</div>
                <div className="blog" onClick={() => navigate("/booking-schedule-customer")}>Lịch hẹn của bạn</div>
              </>)}
              {role !== "Customer" && (
                <div className="blog" onClick={() => navigate("/schedule-doctor")}>Lịch khám của bác sĩ</div>
              )}
            </>
          )}
        </div>

        {/* Thanh Tìm Kiếm */}
        {/* <div className="header__middle">
          <Input placeholder="Tìm kiếm sản phẩm..." className="input-search" />
          <CiSearch className="search-icon" />
        </div> */}

        {/* Phần bên phải */}
        <div className="header__right">
          {isLoggedIn ? (
            <>
              {/* Số dư ví */}
              {role !== 'Doctor' && <div className="wallet">
                <WalletOutlined style={{ fontSize: 20, marginRight: 5 }} />
                <span>{formatMoneyToVND(balanceAccountFromRedux)}</span>
                <Button type="link" onClick={() => navigate("/deposite")}>Nạp tiền</Button>
              </div>}

              {/* Hồ sơ người dùng */}
              <Dropdown overlay={menu} placement="bottomRight">
                <div className="profile-user">
                  {userId ? <Image src={image} preview={false} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '50%' }} /> : <TiUser className="user-icon" size={45} />}

                </div>
              </Dropdown>
            </>
          ) : (
            <div className="login" onClick={() => navigate("/login")}>
              <TiUser size={40} className="user-icon" />
              <p>Đăng nhập / Đăng ký</p>
            </div>
          )}

          {/* Giỏ hàng */}
          {user && (
            <>
              {
                role !== "Doctor" && (<Badge count={cartFromRedux.length} showZero>
                  <BiSolidCart onClick={() => navigate("/cart")} className="cart-icon" />
                </Badge>)
              }
            </>
          )}
        </div>
      </div>
      <MegaMenu />
    </>
  );
};

export default Header;
