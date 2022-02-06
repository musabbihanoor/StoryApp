import React, { Fragment, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import Landing from "./components/Landing";
import LoginNew from "./components/User/LoginNew";
import SignupNew from "./components/User/SignupNew";
import MainScreen from "./components/MainScreen";
import Navbar from "./components/Navbar";
import LiveHosting from "./components/LiveHosting";
import SpacesGroups from "./components/SpacesGroups";
import DoublePage from "./components/Story/DoublePage";
import SinglePage from "./components/Story/SinglePage";
import axios from "axios";

import "./App.css";

const App = () => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    err: { login: null, signup: null },
  });

  const authenticate = async (formData, func, history) => {
    if (func === "google") {
      axios
        .get("http://18.191.249.121:4000/auth/google/callback")
        .then((res) => {
          //history.push(res.data.url);
          console.log(res.data.url);
          window.location.assign(res.data.url);
        });

      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(`http://18.191.249.121:4000/api/user/${func}/`, formData, config)
      .then((res) => {
        setAuth({
          ...auth,
          isAuthenticated: true,
          user: res.data.data,
          err: { ...auth.err, login: null, signup: null },
        });
      })
      .catch((err) => {
        func === "login" &&
          setAuth({
            ...auth,
            isAuthenticated: false,
            user: null,
            err: { ...auth.err, login: err.response.data, signup: null },
          });

        func === "signup" &&
          setAuth({
            ...auth,
            isAuthenticated: false,
            user: null,
            err: { ...auth.err, signup: err.response.data, login: null },
          });
      });
  };

  return (
    <Fragment>
      <Navbar auth={auth} />
      <Router>
        <div>
          <Route
            exact
            path='/'
            component={() => (
              <Landing authenticate={authenticate} auth={auth} />
            )}
          />
          <Route
            exact
            path='/user/login'
            component={() => <LoginNew authenticate={authenticate} />}
          />
          <Route
            exact
            path='/user/signup'
            component={() => <SignupNew authenticate={authenticate} />}
          />
          <Route
            exact
            path='/mainscreen'
            component={() => <MainScreen auth={auth} />}
          />
          <Route exact path='/hosting' component={() => <LiveHosting />} />
          <Route exact path='/spaces' component={() => <SpacesGroups />} />
          <Route exact path='/story/single' component={() => <SinglePage />} />
          <Route exact path='/story/double' component={() => <DoublePage />} />
        </div>
      </Router>
    </Fragment>
  );
};

export default App;
