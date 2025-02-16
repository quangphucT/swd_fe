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
import Profile from "./pages/profile";
import ProfileUser from "./pages/change-password";
import MainLayout from "./components/layoutprofile";
import WalletPage from "./pages/transaction-payment";

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
          path: "/my-account",
          element: <MainLayout />,
          children: [
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "profileuser",
              element: <ProfileUser />,
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
      path: "/admin",
      element: <Dashboard />,
      children: [
        {
          path: "product",
          element: <ManageProduct />,
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
