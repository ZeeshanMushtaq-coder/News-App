import React, { useContext, useCallback } from "react";
import { CategoryContext } from "../context/CategoryContext";

function Navbar({ title }) {
  const { state, dispatch } = useContext(CategoryContext);

  const handleCategoryChange = useCallback(
    (e) => {
      dispatch({ type: "SET_CATEGORY", payload: e.target.value });
    },
    [dispatch]
  );

  return (
    <nav className="navbar navbar-light bg-light shadow-sm mb-3">
      <div className="container d-flex justify-content-between align-items-center">
        <span className="navbar-brand fw-bold">
          {title}
        </span>
        <select
          className="form-select w-auto"
          value={state.category}
          onChange={handleCategoryChange}
        >
          <option value="general">General</option>
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
          <option value="business">Business</option>
          <option value="health">Health</option>
          <option value="entertainment">Entertainment</option>
          <option value="science">Science</option>
        </select>
      </div>
    </nav>
  );
}

export default React.memo(Navbar);
