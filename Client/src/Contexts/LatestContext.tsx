import { ReactNode, createContext, useContext } from "react";
import LatestAddedRepository from "../Services/LatestAddedRepository";

export const LatestContext = createContext<LatestAddedRepository | undefined>(
  undefined
);

type ProviderProps = {
  children: ReactNode;
};

export const LatestProvider = ({ children }: ProviderProps) => {
  const latestAddedRepository = new LatestAddedRepository();

  return (
    <LatestContext.Provider value={latestAddedRepository}>
      {children}
    </LatestContext.Provider>
  );
};

export const useLatest = () => {
  return useContext(LatestContext);
};
