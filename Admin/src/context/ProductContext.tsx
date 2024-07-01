import { ReactNode, createContext, useContext } from "react";
import ProductRepository from "../services/ProductRepository";

export const ProductContext = createContext<ProductRepository | undefined>(
  undefined
);

type ProviderProps = {
  children: ReactNode;
};

export const ProductProvider = ({ children }: ProviderProps) => {
  const productRepository = new ProductRepository();

  return (
    <ProductContext.Provider value={productRepository}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
