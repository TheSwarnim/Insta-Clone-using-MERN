import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../App";

function Navbar() {
  const { state, dispatch } = useContext(userContext);

  const history = useHistory();

  const renderList = () => {
    if (state) {
      return [
        <li key="profile">
          <Link to="/profile">Profile</Link>
        </li>,
        <li key="myfollowingpost">
          <Link to="/myfollowingpost">My following Posts</Link>
        </li>,
        <li key="create-post">
          <Link to="/create-post">Create Post</Link>
        </li>,
        <li key="logout">
          <button
            className="btn waves-effect waves-light red darken-3"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/login");
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li key="login">
          <Link to="/login">Login</Link>
        </li>,
        <li key="signup">
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };

  return (
    <nav>
      <div className="nav-wrapper white">
        {/* <a href="/" className="brand-logo left">
          Instagram
        </a> */}
        <Link to={state ? "/" : "/login"} className="brand-logo left">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
