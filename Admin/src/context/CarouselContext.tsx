import { ReactNode, createContext, useContext } from "react";
import CarouselRepository from "../services/CarouselRepository";

export const CarouselContext = createContext<CarouselRepository | undefined>(
  undefined
);

type ProviderProps = {
  children: ReactNode;
};

export const CarouselProvider = ({ children }: ProviderProps) => {
  const carouselRepository = new CarouselRepository();

  return (
    <CarouselContext.Provider value={carouselRepository}>
      {children}
    </CarouselContext.Provider>
  );
};

export const useCarousel = () => {
  return useContext(CarouselContext);
};
