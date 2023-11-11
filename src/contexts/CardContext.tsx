import React, {
  PropsWithChildren,
  createContext,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Daum } from '../interfaces/interfaces';

export type CardContextType = {
  card: Daum;
  setCard: React.Dispatch<React.SetStateAction<Daum>>;
};

export const CardContext = createContext<CardContextType>(null!);

export function CardContextProvider({ children }: PropsWithChildren) {
  const [card, setCard] = useState<Daum>(null!);

  const value = useMemo(
    () => ({
      card,
      setCard,
    }),
    [card]
  );

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}
