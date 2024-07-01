import { ReactNode, createContext, useContext } from "react";
import RecommendedRepository from "../Services/RecommendedRepository";

export const RecommandedContext = createContext<
  RecommendedRepository | undefined
>(undefined);

type ProviderProps = {
  children: ReactNode;
};

export const RecommandedProvider = ({ children }: ProviderProps) => {
  const recommanded = new RecommendedRepository();

  return (
    <RecommandedContext.Provider value={recommanded}>
      {children}
    </RecommandedContext.Provider>
  );
};

export const useRecommanded = () => {
  return useContext(RecommandedContext);
};
