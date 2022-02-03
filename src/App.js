import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
    err: null,
  });

  const authenticate = async (formData, func) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      axios
        .post(`http://localhost:4000/api/user/${func}`, formData, config)
        .then((res) => {
          setAuth({ ...auth, isAuthenticated: true, user: res.data.data });
        });
      return true;
    } catch (err) {
      console.log(err);
      console.log("error");
      setAuth({ ...auth, isAuthenticated: false, user: null, err: err });
      return false;
    }
  };

  return (
    <Fragment>
      <Navbar />
      <Router>
        <div>
          <Route exact path='/' component={Landing} />
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
          <Route exact path='/mainscreen' component={() => <MainScreen />} />
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
