import React, { useState } from "react";
import { Box } from "@material-ui/core";
import {} from "@material-ui/icons";
import "../styles/landing.css";
import Login from "./User/Login";
import Signup from "./User/Signup";

const Landing = () => {
  const [auth, setAuth] = useState("");

  return (
    <div>
      <div className='landing'>
        <div className='head'>
          <h1 className='fw-bold'>Welcome to the world of stories.</h1>
          <h5>People, stories, and more - all in one place.</h5>
          <button
            className='btn-green mt-5 fw-bold'
            onClick={() => setAuth("login")}
          >
            Get Started
          </button>
        </div>
      </div>
      {auth === "login" && <Login setAuth={setAuth} />}
      {auth === "signup" && <Signup setAuth={setAuth} />}
    </div>
  );
};

export default Landing;
