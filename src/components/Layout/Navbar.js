import React from "react";
import { AuthStore } from "../../store/auth";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

const Navbar = observer(() => {
  return (
    <div className="navbar d-flex align-items-center">
      <img src={process.env.PUBLIC_URL + "/images/amueso-v2.png"} />
      {AuthStore.auth.isAuthenticated && (
        <form className="form-inline d-flex">
          <div className="form-group mx-sm-3 mb-2">
            <input placeholder="Search" />
          </div>
          <button type="submit" className="btn btn-primary mb-2">
            Search
          </button>
        </form>
      )}
      <div className="d-flex align-items-center">
        {!AuthStore.auth.isAuthenticated && (
          <>
            <a href="/" className="mx-3">
              About us
            </a>
            <a href="/" className="mx-3">
              Help
            </a>{" "}
          </>
        )}
        <Link to="/profile">
          <button className="user">
            <i className="fa fa-user-circle-o"></i>
          </button>
        </Link>
        {AuthStore.auth.isAuthenticated && (
          <button onClick={AuthStore.logout} className="btn btn-warning mx-3">
            Logout
          </button>
        )}
      </div>
    </div>
  );
});

export default Navbar;
