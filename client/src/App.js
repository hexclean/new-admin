import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Home from "./components/Home";
// import Cart from "./components/Cart";
import Products from "./components/Products";
import Test from "./components/Test";

const App = () => {
  return (
    <Router>
      <Fragment>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/products" component={Products} />
        <Route exact path="/test" component={Test} />
        {/* <Route exact path="/footer" component={Footer} /> */}
      </Fragment>
    </Router>
  );
};

export default App;
