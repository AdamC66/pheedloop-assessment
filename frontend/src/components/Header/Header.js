import React from "react";
import LogoutButtons from "./LogoutButtons";
import LoginButtons from "./LoginButtons";

function Header({ loggedIn, userName }) {

  // {loggedIn ? <LogoutButtons /> : <LoginButtons />}
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
      <a className="navbar-brand" href="/">
        Navbar
      </a>
      <ul className="navbar-nav">
        <li className="nav-item active">
          <a className="nav-link" href="/">
            Home <span className="sr-only">(current)</span>
          </a>
        </li>
        {loggedIn ? (
          <React.Fragment>
            <li className="nav-item active">
              <a className="nav-link" href="/my-sessions">
                My Sessions
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/my-speakers">
                My Speakers
              </a>
            </li>
          </React.Fragment>
        ) : (
          <div></div>
        )}
      </ul>
      <ul className="navbar-nav">
        {loggedIn ? <LogoutButtons /> : <LoginButtons />}
      </ul>
    </nav>
  );
}

export default Header;
