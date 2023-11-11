import React, {
  PropsWithChildren,
  createContext,
  useMemo,
  useState,
} from 'react';

import { Daum } from '../interfaces/interfaces';

export type ResultsContextType = {
  items: Daum[];
  setResults: React.Dispatch<React.SetStateAction<Daum[]>>;
};

export const ResultsContext = createContext<ResultsContextType>(null!);

export function ResultsContextProvider({ children }: PropsWithChildren) {
  const [items, setResults] = useState<Daum[]>([]);

  const value = useMemo(
    () => ({
      items,
      setResults,
    }),
    [items]
  );

  return (
    <ResultsContext.Provider value={value}>{children}</ResultsContext.Provider>
  );
}
