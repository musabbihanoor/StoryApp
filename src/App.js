import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";

const App = () => {
  return (
    <Fragment>
      <Router>
        <div>
          <Route exact path='/' component={Landing} />
        </div>
      </Router>
    </Fragment>
  );
};

export default App;
