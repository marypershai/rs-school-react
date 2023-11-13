import React, {
  PropsWithChildren,
  createContext,
  useMemo,
  useState,
} from 'react';

export type SearchValueContextType = {
  searchTerm: string;
};

export const SearchValueContext = createContext<SearchValueContextType>(null!);

export function SearchValueContextProvider({ children }: PropsWithChildren) {
  const [searchValue] = useState<string>(
    localStorage.getItem('searchValue') || ''
  );

  const value = useMemo(
    () => ({
      searchValue,
    }),
    [searchValue]
  );

  return (
    <SearchValueContext.Provider value={value}>
      {children}
    </SearchValueContext.Provider>
  );
}
