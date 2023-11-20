import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export default function Home() {
  return (
    <div>
      <NavLink exact to="/">
        Home
      </NavLink>
      <div>Search</div>
    </div>
  );
}
