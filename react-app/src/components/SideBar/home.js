import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Home() {
  const history = useHistory();

  const onClickHome = () => {
    return history.push(`/`)
  };

  const onClickSearch = () => {
    return history.push(`/search`)
  };

  return (
    <div className="HomeSearchContainer">
      <button onClick={onClickHome}>Home</button>
      <button onClick={onClickSearch}>Search</button>

    </div>
  );
}
