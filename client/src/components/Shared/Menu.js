import React from "react";
import { Link } from "react-router-dom";

export const Menu = () => (
  <div className="col-md-4">
    <div className="white-box">
      <h2>Menü</h2>
      <ul className="nav nav-tabs tabs-left sideways menu-list">
        <li>
          <Link to={"/my-profile"}>Személyes adataim</Link>
        </li>
        <li>
          <Link to={"/my-adress"}>Címek</Link>
        </li>
        <li>
          <Link to="/">List Item 3</Link>
        </li>
        <li>
          <Link to="/">List Item 4</Link>
        </li>
        <li>
          <Link to="/">List Item 5</Link>
        </li>
        <li>
          <Link to="/">List Item 6</Link>
        </li>
        <li>
          <Link to="/">List Item 7</Link>
        </li>
        <li>
          <Link to="/">List Item 8</Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Menu;
