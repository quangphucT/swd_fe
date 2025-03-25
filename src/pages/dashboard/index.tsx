import { useState } from "react";
import {
  DashboardOutlined,
  DesktopOutlined,
  FileOutlined,
  LogoutOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.scss";



// icon
import { MdManageAccounts } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { MdDiscount } from "react-icons/md";
import { MdOutlineDiscount } from "react-icons/md";
import { FaBlog } from "react-icons/fa";




import { Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const { Content, Sider } = Layout;
function getItem(label, key, icon, children, onClick) {
  return {
    key,
    icon,
    children,
    label: onClick ? (
      <span onClick={onClick} style={{ cursor: "pointer" }}>
        {label}
      </span>
    ) : (
      <Link to={`/dashboard/${key}`}>{label}</Link>
    ),
  };
}

const Dashboard = () => {


  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");

  };
  const items = [
    getItem("Cập nhật Profile", "update-account-profile", <DashboardOutlined style={{ fontSize: '30px' }} />),
    getItem("Dashboard", "", <DashboardOutlined style={{ fontSize: '30px' }} />),
    getItem("Quản lý khách hàng", "manage-customer", <MdManageAccounts size={33} />,
      [
        getItem("Quản lý bác sĩ", "manage-doctor", <MdManageAccounts size={33} />, [
          getItem("Danh sách bác sĩ", "manage-list-doctor", <MdManageAccounts size={33} />)
        ]),
        getItem("Quản lý nhân viên", "manage-staff", <MdManageAccounts size={33} />, [
          getItem("Danh sách nhân viên", "manage-list-staff", <MdManageAccounts size={33} />)
        ])
      ]
    ),
    getItem("Quản lý combo chuyên sâu", "manage-packaging", <MdOutlineProductionQuantityLimits size={30} />, [
      getItem("Quản lý chi tiết combo", "manage-detail-package", <MdOutlineProductionQuantityLimits size={30} />)
    ]),
    getItem("Đơn hàng đợi duyệt", "manage-order", <MdOutlineProductionQuantityLimits size={30} />,
      [
        getItem("Quản lý đơn yêu cầu hủy", "manage-request-cancelOrder", <MdOutlineProductionQuantityLimits size={30} />)
      ]
    ),
    getItem("Quản lý đặt lịch chuyên sâu", "manage-advance-booking", <TbBrandBooking size={30} />, [
      getItem("Danh sách đã được xác nhận", "manage-advanceBookingConfirmed", <TbBrandBooking size={30} />),
      getItem("Check tiến độ điều trị", "check-complete-treatmentSession", <TbBrandBooking size={30} />)
    ]),
    getItem("Cuộc hẹn đang chờ xử lý", "manage-pending-appointment", <TbBrandBooking size={30} />,
      [
        getItem("Cuộc hẹn đã được duyệt", "manage-confirmed-appointment", <TbBrandBooking size={30} />)
      ]
    ),
    getItem("Quản lý mã giảm giá", "manage-discount", <MdDiscount size={30} />, [
      getItem("Quản lý thể loại giảm giá", "manage-discount-category", <MdOutlineDiscount size={30} />),

    ]),
    getItem("Quản lý blog", "blog-management", <FaBlog size={30} />),
    getItem("Quản lý thương hiện", "brand-management", <DesktopOutlined />, [
      getItem("Quản lý hình ảnh", "manage-images", <TeamOutlined />),
      getItem("Quản lý nguồn gốc thương hiệu", "manage-brandOrigin", <PieChartOutlined />),
      getItem("Quản lý đơn vị", "manage-unit", <TeamOutlined />),

    ]),
    getItem("Manage packaging", "manage-packaging-product", <UserOutlined />),
    getItem("Manage solution", "manage-solution", <TeamOutlined />),
    getItem("Quản lý thể loại", "manage-category", <FileOutlined />),

    getItem("Manage manufacturer", "manage-manufacturer", <DesktopOutlined />),
    getItem("Manage manufacturedCountry", "manage-manufacturedCountry", <UserOutlined />),

    getItem("Quản lý sản phẩm", "manage-products", <TeamOutlined />, [
      getItem("Quản lý chi tiết sản phẩm", "manage-productDetails", <TeamOutlined />),
    ]),

    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <div onClick={handleLogout}><span>Đăng xuất</span></div>,
    },
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const userRole = useSelector((store: RootState) => store?.user?.user?.roles[0])
  return (
    <Layout
      style={{
        minHeight: "100vh",

      }}
    >
      <Sider
        width={320} // Set the sidebar width correctly
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <div style={{ background: '#2968a7', color: '#fff' }} className="admin-section">
          <UserOutlined className="admin-icon" />

          <span className="admin-text">{collapsed ? "" : `Welcome ${userRole}`}</span>
        </div>
        <Menu
          theme="dard"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={{ fontSize: "18px", fontWeight: "300" }}
        />
      </Sider>

      <Layout>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
