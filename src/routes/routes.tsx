import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import AboutUs from "../pages/AboutUs/AboutUs";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Wishlist from "../pages/Wishlist/Wishlist";
import PersonalizedOrders from "../pages/PersonalizedOrders/PersonalizedOrders";
import Checkout from "../pages/Checkout/Checkout";
import CustomizeProduct from "../pages/CustomizeProduct/CustomizeProduct";
import BulkOrders from "../pages/BulkOrders/BulkOrders";
import OrderSuccess from "../components/CheckoutPage/OrderSuccess/OrderSuccess";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import ManageAddress from "../pages/Dashboard/ManageAddress/ManageAddress";
import TrackOrder from "../pages/TrackOrder/TrackOrder";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout/AdminDashboardLayout";
import AdminDashboardHome from "../pages/AdminDashboardPages/AdminDashboardHome/AdminDashboardHome";
import OrdersManagement from "../pages/AdminDashboardPages/OrdersManagement/OrdersManagement";
import ProductsManagement from "../pages/AdminDashboardPages/ProductsManagement/ProductsManagement";
import AddProduct from "../pages/AdminDashboardPages/AddProduct/AddProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorComponent />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/track-order",
        element: <TrackOrder />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:slug",
        element: <ProductDetails />,
      },
      {
        path: "/product/customize/:id",
        element: <CustomizeProduct />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/order-success/:orderId",
        element: <OrderSuccess />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/personalized-orders",
        element: <PersonalizedOrders />,
      },
      {
        path: "/bulk-orders",
        element: <BulkOrders />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    // errorElement: <ErrorComponent />,
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "address",
        element: <ManageAddress />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboardLayout />,
    // errorElement: <ErrorComponent />,
    children: [
      {
        path: "",
        element: <AdminDashboardHome />,
      },
      {
        path: "orders-management",
        element: <OrdersManagement />,
      },
      {
        path: "products-management",
        element: <ProductsManagement />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "address",
        element: <ManageAddress />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
