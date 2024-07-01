import { ReactNode, createContext, useContext } from "react";
import Search from "../Services/Search";

export const SearchContext = createContext<Search | undefined>(undefined);

type ProviderProps = {
  children: ReactNode;
};

export const SearchProvider = ({ children }: ProviderProps) => {
  const search = new Search();

  return (
    <SearchContext.Provider value={search}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
