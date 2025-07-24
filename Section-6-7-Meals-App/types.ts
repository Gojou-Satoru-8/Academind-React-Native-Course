// SECTION: REACT-NAVIGATION TYPES:
// List all your screens at the Root level, with all params expected by each
export type RootStackParamList = {
  // MealsCategories: undefined;
  MainScreenDrawer: undefined;
  MealsOverview: { categoryId: string };
  MealDetails: { mealId: string };
};

export type DrawerParamList = {
  MealsCategories: undefined;
  Favourites: undefined;
};

// export enum Screens {
//   MealsCategories = "MealsCategories",
//   MealsOverview = "MealsOverview",
// }

// SECTION: CONTEXT TYPES:
export interface FavouritesContextType {
  ids: string[];
  addFavourite(id: string): void;
  removeFavourite(id: string): void;
}
