import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Partners from "./components/Partners";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route exact path="/partners" component={Partners} />
      </Fragment>
    </Router>
  );
};

export default App;
