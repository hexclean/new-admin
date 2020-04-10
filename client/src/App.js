import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Route exact path="/" component={Home} />
      </Fragment>
    </Router>
  );
};

export default App;
