import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Homepage from "../Pages/Homepage/Homepage";
import ProductPage from "../Pages/ProductPage/ProductPage";
import Product from "../Pages/Product/Product";
import Results from "../Pages/Results/Results";
import Checkout from "../Pages/Checkout/Checkout";
import Account from "../Pages/Account/Account";
import ProtectedRoute from "../Utils/ProtectedRoute";

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
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/account",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
      },
      {
        path: "/*",
        element: <ProductPage />,
      },
    ],
  },
]);

export default router;
