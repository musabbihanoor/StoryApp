import React, { useEffect } from "react";
import { Redirect, withRouter, useHistory } from "react-router-dom";
import Login from "./User/Login";
import Signup from "./User/Signup";
import { AuthStore } from "../store/auth";
import { observer } from "mobx-react";

const Landing = observer(({ authOption, setAuthOption }) => {
  const history = useHistory();

  useEffect(() => {
    if (AuthStore.auth.isAuthenticated) {
      history.push("/menu");
    }
  }, [AuthStore.auth.isAuthenticated]);

  return (
    <div>
      <div className="landing">
        <div className="head">
          <h1 className="fw-bold">Welcome to the world of stories.</h1>
          <h5>People, stories, and more - all in one place.</h5>
          <button
            className="btn-green mt-5 fw-bold"
            onClick={() => setAuthOption("login")}>
            Get Started
          </button>
        </div>
        <img
          className="landing-books "
          src={process.env.PUBLIC_URL + "/images/landing_image.png"}
        />
        <div className="d-flex flex-column align-items-center">
          <img
            className="contribute"
            src={process.env.PUBLIC_URL + "/images/Writer-Contribution.png"}
          />

          <img
            className="logo"
            src={process.env.PUBLIC_URL + "/images/amueso-v2.png"}
          />
        </div>
      </div>

      {authOption === "login" && <Login setAuth={setAuthOption} />}
      {authOption === "signup" && <Signup setAuth={setAuthOption} />}
    </div>
  );
});

export default withRouter(Landing);
