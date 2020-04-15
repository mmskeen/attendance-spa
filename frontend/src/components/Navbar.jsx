import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isAuthenticated }) {
  return (
    <section className="white-section">
      <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand" to="/">
            Attending
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link dashboard" to="/attendance">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link profile" to="/profile">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
  );
}

export default Navbar;