import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Home from "./components/Home";
// import Cart from "./components/Cart";
import Login from "./components/Login";
import SignUp from "./components/Register";
import Profile from "./components/UserProfile/Profile";
import Products from "./components/PartnerPage";
import Partners from "./components/Partners";
import DeliveryAdress from "./components/UserProfile/DeliveryAdressList";
import NewDeliveryAdress from "./components/UserProfile/AddDeliveryAdress";

const App = () => {
  return (
    <Router>
      <Fragment>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/products" component={Products} />
        <Route exact path="/" component={Partners} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={SignUp} />
        <Route exact path="/my-profile" component={Profile} />
        <Route exact path="/my-adress" component={DeliveryAdress} />
        <Route exact path="/new-adress" component={NewDeliveryAdress} />
        {/* <Route exact path="/footer" component={Footer} /> */}
      </Fragment>
    </Router>
  );
};

export default App;
