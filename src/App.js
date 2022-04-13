import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import MainScreen from "./components/MainScreen";
import Navbar from "./components/Layout/Navbar";
import ProofRead from "./components/Story/ProofRead";
import Group from "./components/Group/Group";
import { observer } from "mobx-react";

import "./App.css";

const App = observer(() => {
  const [authOption, setAuthOption] = useState("");

  return (
    <Fragment>
      <Navbar />
      <Router>
        <div>
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
        </div>
      </Router>
    </Fragment>
  );
});

export default App;
