import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Home from "./components/Home";
// import Cart from "./components/Cart";
import Login from "./components/Login";

// import Products from "./components/Products";
import Partners from "./components/Partners";

const App = () => {
  return (
    <Router>
      <Fragment>
        {/* <Route exact path="/" component={Home} /> */}
        {/* <Route exact path="/products" component={Products} /> */}
        <Route exact path="/" component={Partners} />
        <Route exact path="/login" component={Login} />

        {/* <Route exact path="/footer" component={Footer} /> */}
      </Fragment>
    </Router>
  );
};

export default App;
