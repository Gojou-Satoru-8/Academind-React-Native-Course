import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const initialFavouritesState: { ids: string[] } = {
  ids: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  //   initialState: { ids: [] as string[] },     // Or:
  initialState: initialFavouritesState,
  reducers: {
    addFavourite: (state, action: PayloadAction<{ id: string }>) => {
      //   state.ids = [...new Set([action.payload, ...state.ids])];
      console.log("ID to favourite: ", action.payload.id);
      if (!state.ids.includes(action.payload.id)) state.ids.unshift(action.payload.id);
    },
    removeFavourite: (state, action: PayloadAction<{ id: string }>) => {
      // state.ids.splice(state.ids.indexOf(action.payload.id), 1);
      // NOTE: Above way may cause errors when id is not found in state.ids, .indexOf() will return
      // -1, and splice(-1, 1) will remove the last element.
      state.ids = state.ids.filter((mealId) => mealId !== action.payload.id);
    },
  },
});

const store = configureStore({
  reducer: { favourites: favouritesSlice.reducer },
});

export const favouritesActions = favouritesSlice.actions;
export default store;
export type RootState = ReturnType<typeof store.getState>;
// This is to be used inside useSelector to type the state argument
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// This is an alternative to using useSelector, where you don't have to import and assign the
// RootState type to state argument everytime
