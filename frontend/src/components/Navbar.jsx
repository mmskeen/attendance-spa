import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "react-use-auth";

function Navbar({ colored }) {
  const { isAuthenticated, login, logout } = useAuth();

  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/");
  }

  const handleLogin = () => {
    login();
  }


  const NavbarLoggedIn = () => (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link dashboard" to="/dashboard">
          Dashboard
      </Link>
      </li>
      <li className="nav-item"><a className="nav-link" href="/" onClick={handleLogout}>
        Logout
    </a>
      </li>
      <li className="nav-item">
        <Link className="nav-link profile" to="/profile">
          Profile
      </Link>
      </li>
    </ul>
  );

  const NavbarLoggedOut = () => (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link login" to="/dashboard" onClick={handleLogin}>Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link register" to="/dashboard" onClick={handleLogin}>Register</Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#footer">Contact</a>
      </li>
    </ul>
  );

  return (
    <section id="navbar-section" className={colored ? "colored-section" : "white-section"}>
      <div>
        <nav className={"navbar navbar-expand-lg " + (colored ? "navbar-dark" : "navbar-light")}>
          <Link className="navbar-brand" to={isAuthenticated() ? "/dashboard" : "/"}>
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
            {isAuthenticated() ? <NavbarLoggedIn /> : <NavbarLoggedOut />}
          </div>
        </nav>
      </div>
    </section >
  );
}

export default Navbar;