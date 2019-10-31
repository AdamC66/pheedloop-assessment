import React from "react";
function LoginButtons() {
  return (
    <React.Fragment>
      <li className="nav-item active">
        <a className="nav-link" href="/login">
          Login
        </a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="/register">
          Register
        </a>
      </li>
    </React.Fragment>
  );
}

export default LoginButtons;
