import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import "./index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ProductProvider } from "./context/ProductContext";
import { ToDoProvider } from "./context/ToDoContext";
import { VariantProvider } from "./context/VariantContext";
import { CarouselProvider } from "./context/CarouselContext";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProductProvider>
      <ToDoProvider>
        <VariantProvider>
          <CarouselProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </CarouselProvider>
        </VariantProvider>
      </ToDoProvider>
    </ProductProvider>
  </React.StrictMode>
);
