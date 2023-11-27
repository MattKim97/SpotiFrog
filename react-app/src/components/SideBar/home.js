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
      <button onClick={onClickHome}><i className="fa-solid fa-house"></i>Home</button>
      <button onClick={onClickSearch}><i className="fa-solid fa-eye"></i>View All</button>
    </div>
  );
}
