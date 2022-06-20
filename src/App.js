import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import MainScreen from "./components/MainScreen";
import Navbar from "./components/Layout/Navbar";
import ProofRead from "./components/Story/ProofRead";
import Group from "./components/Group/Group";
import Menu from "./components/Layout/Menu";
import Profile from "./components/User/Profile";
import Cover from "./components/Story/Cover";
import Read from "./components/Story/Read";
import { observer } from "mobx-react";

import "./App.css";
import { AuthStore } from "./store/auth";

const App = observer(() => {
  const [authOption, setAuthOption] = useState("");

  return (
    <Fragment>
      <Router>
        <div>
          {AuthStore.auth.isAuthenticated && <Navbar />}
          <Route
            exact
            path="/"
            component={() => (
              <Landing authOption={authOption} setAuthOption={setAuthOption} />
            )}
          />
          <Route exact path="/mainscreen" component={() => <MainScreen />} />
          {/* <Route exact path="/spaces" component={() => <SpacesGroups />} /> */}
          {/* <Route exact path="/story/single" component={() => <SinglePage />} /> */}
          <Route
            exact
            path="/story/proofread"
            component={() => <ProofRead />}
          />
          <Route exact path="/group" component={() => <Group />} />
          <Route exact path="/menu" component={() => <Menu />} />
          <Route exact path="/profile" component={() => <Profile />} />
          <Route exact path="/cover" component={() => <Cover />} />
          <Route exact path="/read" component={() => <Read />} />
        </div>
      </Router>
    </Fragment>
  );
});

export default App;
