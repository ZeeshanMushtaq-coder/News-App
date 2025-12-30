import { createContext } from "react";

export const CategoryContext = createContext();

export const initialState = {
  category: "general",
};

export function categoryReducer(state, action) {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    default:
      return state;
  }
}
