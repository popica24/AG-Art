import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Homepage from "../pages/Homepage/Homepage";
import ToDo from "../pages/Todo/ToDo";
import Catalogue from "../pages/Catalogue/Catalogue";
import CouponManager from "../pages/CouponManager/CouponManager";
import Clients from "../pages/Clients/Clients";
import Banners from "../pages/Banners/Banners";
import Carousel from "../pages/Carousel/Carousel";
import DiscountManager from "../pages/DiscountManager/DiscountManager";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "todo",
        element: <ToDo />,
      },
      {
        path: "catalogue",
        element: <Catalogue />,
      },
      {
        path: "discounts",
        element: <DiscountManager />,
      },
      {
        path: "coupons",
        element: <CouponManager />,
      },
      {
        path: "clients",
        element: <Clients />,
      },
      {
        path: "banners",
        element: <Banners />,
      },
      {
        path: "carousel",
        element: <Carousel />,
      },
    ],
  },
]);
export default router;
