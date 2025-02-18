import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";

import "./index.css";
import Login from "./pages/login";
import Cart from "./pages/cart";
import Dashboard from "./pages/dashboard";
import ManageProduct from "./pages/manage-products";
import Register from "./pages/register";
import ForgetPassword from "./pages/forget-password";
import ResetPassword from "./pages/reset-password";
import ManageBrand from "./pages/manage-brand";
import DashboardStatistic from "./pages/dashboard-statistics";
import PackagingManage from "./pages/packaging-manage";
import ManageSolution from "./pages/manage-solution";
import ManageCategory from "./pages/manage-category";
import ManageBrandOrigin from "./pages/brand-origin-manage";
import ManageManufacturer from "./pages/manage-manufacturer";
import ManageManufacturedCountries from "./pages/manage-manufacturedCountries";
import ManageProductDetails from "./pages/manage-productDetails";
import ManageImage from "./pages/manage-list-images";
import ManageUnit from "./pages/manage-unit";
import MainLayout from "./components/layoutprofile";
import Profile from "./pages/profile";
import WalletPage from "./pages/transaction-payment";
import ChangePassword from "./pages/change-password";
import ProductDetail from "./pages/product-detail";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "/cart",
          element: <Cart />,
        },

        {
          path: "*",
          element: <ForgetPassword />,
        },
        {
          path: "/reset-password",
          element: <ResetPassword />,
        },
        {
          path: "/product/:id",
          element: <ProductDetail />,
        },
        {
          path: "/my-account",
          element: <MainLayout />,
          children: [
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "change-password",
              element: <ChangePassword />,
            },
            {
              path: "transaction-payment",
              element: <WalletPage />,
            },
          ],
        },
      ],
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "brand-management",
          element: <ManageBrand />,
        },
        {
          path: "",
          element: <DashboardStatistic />,
        },
        {
          path: "manage-packaging",
          element: <PackagingManage />,
        },
        {
          path: "manage-solution",
          element: <ManageSolution />,
        },
        {
          path: "manage-category",
          element: <ManageCategory />,
        },
        {
          path: "manage-brandOrigin",
          element: <ManageBrandOrigin />,
        },
        {
          path: "manage-manufacturer",
          element: <ManageManufacturer />,
        },
        {
          path: "manage-manufacturedCountry",
          element: <ManageManufacturedCountries />,
        },
        {
          path: "manage-productDetails",
          element: <ManageProductDetails />,
        },
        {
          path: "manage-products",
          element: <ManageProduct />,
        },
        {
          path: "manage-images",
          element: <ManageImage />,
        },
        {
          path: "manage-unit",
          element: <ManageUnit />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
