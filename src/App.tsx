import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/layout";
import Home from "./pages/home";

import './index.css'
import Login from "./pages/login";
import Cart from "./pages/cart";
import Dashboard from "./pages/dashboard";
import ManageProduct from "./pages/manage-products";
import Register from "./pages/register";
const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/cart',
          element: <Cart />
        },
         {
          path: '/register',
          element: <Register />
        },

      ]
    },
    {
      path: '/admin',
      element: <Dashboard />,

      children: [
        {
          path: 'product',
          element: <ManageProduct />
        }
      ]
    }

  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

