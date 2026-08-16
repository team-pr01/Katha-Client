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
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:id",
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
]);
