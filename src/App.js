import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import MainScreen from "./components/MainScreen";
import Navbar from "./components/Navbar";
import LiveHosting from "./components/LiveHosting";
import SpacesGroups from "./components/SpacesGroups";
import DoublePage from "./components/Story/DoublePage";
import SinglePage from "./components/Story/SinglePage";
import axios from "axios";

import "./App.css";

const App = ({ history }) => {
  const [authOption, setAuthOption] = useState("");
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    err: { login: null, signup: null },
  });

  // const test = () => {
  //   console.log("test");
  // };

  const handleLogin = async (googleData) => {
    console.log(googleData, "GDP");
    if (googleData.error) {
      alert(googleData.error);
    } else {
      try {
        const res = await fetch("http://localhost:4000/auth/google/", {
          method: "POST",
          body: JSON.stringify({
            token: googleData.tokenId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
        setAuth({
          ...auth,
          isAuthenticated: true,
          user: data.data,
          err: { ...auth.err, login: null, signup: null },
        });
      } catch (err) {
        console.log(err);
        setAuth({
          ...auth,
          isAuthenticated: false,
          user: null,
          err: { ...auth.err, login: err, signup: null },
        });
      }
    }
  };

  const authenticate = async (formData, func, history) => {
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
      <Navbar auth={auth} setAuth={setAuth} history={history} />
      <Router>
        <div>
          <Route
            exact
            path='/'
            component={() => (
              <Landing
                authenticate={authenticate}
                auth={auth}
                handleLogin={handleLogin}
                authOption={authOption}
                setAuthOption={setAuthOption}
              />
            )}
          />

          <Route
            exact
            path='/mainscreen'
            component={() => <MainScreen auth={auth} />}
          />
          <Route exact path='/hosting' component={() => <LiveHosting />} />
          <Route exact path='/spaces' component={() => <SpacesGroups />} />
          <Route
            exact
            path='/story/single'
            component={() => <SinglePage user={auth.user} />}
          />
          <Route exact path='/story/double' component={() => <DoublePage />} />
        </div>
      </Router>
    </Fragment>
  );
};

export default App;
