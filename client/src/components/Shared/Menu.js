import React from "react";
import { Link } from "react-router-dom";

export const Menu = () => (
  <div class="col-md-4">
    <div class="white-box">
      <h2>Menü</h2>
      <ul class="nav nav-tabs tabs-left sideways menu-list">
        <li>
          <a>
            <Link to={"/my-profile"}>Személyes adataim</Link>
          </a>
        </li>
        <li>
          <a>
            <Link to={"/my-adress"}>Címek</Link>
          </a>
        </li>
        <li>
          <a href="#">List Item 3</a>
        </li>
        <li>
          <a href="#">List Item 4</a>
        </li>
        <li>
          <a href="#">List Item 5</a>
        </li>
        <li>
          <a href="#">List Item 6</a>
        </li>
        <li>
          <a href="#">List Item 7</a>
        </li>
        <li>
          <a href="#">List Item 8</a>
        </li>
      </ul>
    </div>
  </div>
);

export default Menu;
