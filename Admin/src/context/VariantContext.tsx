import { ReactNode, createContext, useContext } from "react";
import VariantRepository from "../services/VariantRepository";

export const VariantContext = createContext<VariantRepository | undefined>(
  undefined
);

type ProviderProps = {
  children: ReactNode;
};

export const VariantProvider = ({ children }: ProviderProps) => {
  const variantRepository = new VariantRepository();

  return (
    <VariantContext.Provider value={variantRepository}>
      {children}
    </VariantContext.Provider>
  );
};

export const useVariants = () => {
  return useContext(VariantContext);
};
