import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";

import "./index.css";
import Login from "./pages/login";

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


import Cart from "./pages/cart";
import ProductDetail from "./pages/product-detail";
import DepositePage from "./pages/deposite-page";
import HistoryDeposite from "./pages/history-deposite";
import BlogPage from "./pages/blog-page";
import ManageBlog from "./pages/mange-blog";
import BlogDetails from "./pages/blog-details";
import ManageDiscount from "./pages/manage-discount";
import ManageDiscountCategory from "./pages/manage-discountCategory";
import YourOrderList from "./pages/history-order";
import ManageOrder from "./pages/manage-order";
import BookingPage from "./pages/booking-page";
import ManageDoctor from "./pages/manage-doctor";
import ManageStaff from "./pages/manage-staff";
import ManageCustomer from "./pages/manage-customer";
import ScheduleCustomerBooking from "./pages/booking-customer-schedule";

import ManagePendingAppointments from "./pages/manage-pending-appointments";
import ManageConfirmedAppointments from "./pages/manage-confirmed-appointment";
import ScheduleOfDoctor from "./pages/schedule-doctor-page";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import ShoppingPage from "./pages/shopping-page";
import ManageListDoctor from "./pages/manage-list-doctor";
import ManageStaffList from "./pages/manage-list-staff";
import UpdateAccountProfle from "./pages/update-account-profile";
import ManageRequestCancelOrder from "./pages/manage-requestCancelOrder";

import BookingTakeCare from "./pages/booking-takecare";
import ManagePackaging from "./pages/manage-packaging";
import ManageAdvanceBooking from "./pages/manage-advance-booking";
import ManageDetailsPackage from "./pages/manage-details-package";
import ManageConfirmAdvanceBooking from "./pages/manage-confirm-advancedBooking";
import CheckCompleteTreatmentSection from "./pages/check-complete-treatmentsession";








const App = () => {
  const role = useSelector((store: RootState) => store.user?.user.roles[0])
  const router = createBrowserRouter([
    {
      path: "/",

      element: role === "Staff" ? <Navigate to={"/dashboard"} replace /> : <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/shopping",
          element: <ShoppingPage />,
        },
        {
          path: '/deposite',
          element: <DepositePage />
        },

        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/booking-page",
          element: <BookingPage />,
        },
        {
          path: "/blog",
          element: <BlogPage />,
        },
        {
          path: "/schedule-doctor",
          element: <ScheduleOfDoctor />,
        },
        {
          path: "/booking-schedule-customer",
          element: <ScheduleCustomerBooking />,
        },

        {
          path: "/booking-takecare",
          element: <BookingTakeCare />,
        },

        {
          path: "/blog-details/:id",
          element: <BlogDetails />,
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
              path: "your-order",
              element: <YourOrderList />,
            },
            {
              path: "history-deposite",
              element: <HistoryDeposite />,
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
      element: role === "Customer" || role === "Doctor" ? <Navigate to={"/"} replace /> : <Dashboard />,
      children: [
        {
          path: "brand-management",
          element: <ManageBrand />,
        },
      
        {
          path: "manage-advance-booking",
          element: <ManageAdvanceBooking />,
        },
        // new
        {
          path: "update-account-profile",
          element: <UpdateAccountProfle />,
        },

        //new
        {
          path: "manage-request-cancelOrder",
          element: <ManageRequestCancelOrder />,
        },

         //new
         {
          path: "manage-detail-package",
          element: <ManageDetailsPackage />,
        },
       
        // create packaging
        {
          path: "manage-packaging",
          element: <ManagePackaging />,
        },

        // new 
        {
          path: "manage-list-doctor",
          element: <ManageListDoctor />
        },
        // new
        {
          path: "manage-list-staff",
          element: <ManageStaffList />
        },

        // new
        {
          path: "manage-advanceBookingConfirmed",
          element: <ManageConfirmAdvanceBooking />
        },
        // new
        {
          path: "check-complete-treatmentSession",
          element: <CheckCompleteTreatmentSection />
        },
        {
          path: "blog-management",
          element: <ManageBlog />,
        },
        {
          path: "manage-customer",
          element: <ManageCustomer />,
        },
        {
          path: "manage-pending-appointment",
          element: <ManagePendingAppointments />,
        },
        {
          path: "manage-confirmed-appointment",
          element: <ManageConfirmedAppointments />,
        },
        {
          path: "manage-doctor",
          element: <ManageDoctor />,
        },
        {
          path: "manage-staff",
          element: <ManageStaff />,
        },
        {
          path: "manage-discount",
          element: <ManageDiscount />,
        },
        {
          path: "manage-order",
          element: <ManageOrder />,
        },
        {
          path: "manage-discount-category",
          element: <ManageDiscountCategory />,
        },
        {
          path: "",
          element: <DashboardStatistic />,
        },
        {
          path: "manage-packaging-product",
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
