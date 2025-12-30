import { useReducer } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import {
  CategoryContext,
  categoryReducer,
  initialState,
} from "./context/CategoryContext";

export default function App() {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  return (
    <CategoryContext.Provider value={{ state, dispatch }}>
      <HashRouter>
        <Navbar title="MyNews App" />
        <News />
      </HashRouter>
    </CategoryContext.Provider>
  );
}
