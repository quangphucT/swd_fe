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
    getItem("Dashboard", "", <DashboardOutlined style={{ fontSize: '30px' }} />),
    getItem("Manage Customer", "manage-customer", <MdManageAccounts size={33} />,
      [
        getItem("Manage Doctor", "manage-doctor", <MdManageAccounts size={33}/>),
        getItem("Manage Staff", "manage-staff", <MdManageAccounts size={33}/>)
      ]
    ),
    getItem("Manage Order", "manage-order", <MdOutlineProductionQuantityLimits size={30} />),
    getItem("Manage pending appointments", "manage-pending-appointment", <TbBrandBooking size={30} />,
      [
        getItem("Manage confirmed appointments", "manage-confirmed-appointment", <TbBrandBooking size={30} />)
      ]
    ),
    getItem("Manage Discount", "manage-discount", <MdDiscount size={30} />, [
      getItem("Manage DiscountCategory", "manage-discount-category", <MdOutlineDiscount size={30} />),

    ]),
    getItem("Manage Blog", "blog-management", <FaBlog size={30} />),
    getItem("Manage brand", "brand-management", <DesktopOutlined />, [
      getItem("Manage images", "manage-images", <TeamOutlined />),
      getItem("Manage brandOrigin", "manage-brandOrigin", <PieChartOutlined />),
      getItem("Manage unit", "manage-unit", <TeamOutlined />),

    ]),
    getItem("Manage packaging", "manage-packaging", <UserOutlined />),
    getItem("Manage solution", "manage-solution", <TeamOutlined />),
    getItem("Manage category", "manage-category", <FileOutlined />),

    getItem("Manage manufacturer", "manage-manufacturer", <DesktopOutlined />),
    getItem("Manage manufacturedCountry", "manage-manufacturedCountry", <UserOutlined />),

    getItem("Manage products", "manage-products", <TeamOutlined />, [
      getItem("Manage productDetails", "manage-productDetails", <TeamOutlined />),
    ]),

    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <div onClick={handleLogout}><span>Logout</span></div>,
    },
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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

          <span className="admin-text">{collapsed ? "" : "Admin"}</span>
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
