import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ShoppingCartProvider } from "./Contexts/ShoppingCartContext";
import React from "react";
import { ProductProvider } from "./Contexts/ProductContext";
import { LatestProvider } from "./Contexts/LatestContext";
import { RecommandedProvider } from "./Contexts/RecommandedContext";
import { SearchProvider } from "./Contexts/SearchContext";
import { AuthProvider } from "./Contexts/AuthContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProductProvider>
          <LatestProvider>
            <RecommandedProvider>
              <SearchProvider>
                <ShoppingCartProvider>
                  <RouterProvider router={router} />
                </ShoppingCartProvider>
              </SearchProvider>
            </RecommandedProvider>
          </LatestProvider>
        </ProductProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
