import React from "react";

import "./Sidenav.css";

export const Sidenav = () => {
  return (
    <nav className="sidebar" id="sidebar">
      <ul className="components">
        <li className="nav-item">
          <a className="nav-link selected-tab" href="/">
            <i className="material-icons">home</i>Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link selected-tab" href="/models">
            <i className="material-icons">flight</i>Models
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link selected-tab" href="/inventory">
            <i className="material-icons">inventory_2</i>Inventory
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link selected-tab" href="/builds">
            <i className="material-icons">precision_manufacturing</i>Build
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link selected-tab" href="/aircrafts">
            <i className="material-icons">flight</i>Aircrafts
          </a>
        </li>
      </ul>
    </nav>
  );
};
