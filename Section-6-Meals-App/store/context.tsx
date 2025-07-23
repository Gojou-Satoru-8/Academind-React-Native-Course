import { createContext, useState } from "react";
import { FavouritesContextType } from "../types";

export const FavouritesContext = createContext<FavouritesContextType>({
  ids: [],
  addFavourite: () => {},
  removeFavourite: () => {},
});

interface FavouritesContextProviderProps {
  children: React.ReactNode;
}
const FavouritesContextProvider: React.FC<FavouritesContextProviderProps> = ({ children }) => {
  const [ids, setIds] = useState<string[]>([]);
  const addFavourite = (id: string) => {
    // setIds((current) => [id, ...current]);
    // Above is fine as we check for existence in the component too, but below gives extra assurance:
    setIds((current) => [...new Set([id, ...current])]);
  };
  const removeFavourite = (id: string) => {
    setIds((current) => current.filter((mealId) => mealId !== id));
  };

  return (
    <FavouritesContext.Provider value={{ ids, addFavourite, removeFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};
export default FavouritesContextProvider;
