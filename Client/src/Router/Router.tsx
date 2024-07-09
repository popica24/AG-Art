import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Homepage from "../Pages/Homepage/Homepage";
import ProductPage from "../Pages/ProductPage/ProductPage";
import Product from "../Pages/Product/Product";
import Results from "../Pages/Results/Results";
import Success from "../Pages/Success/Success";
import Checkout from "../Pages/Checkout/Checkout";

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
        path: "/product/:productId",
        element: <Product />,
      },
      {
        path: "/filter",
        element: <Results />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/*",
        element: <ProductPage />,
      },
    ],
  },
]);

export default router;
