import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "../components/Login";
import SignUp from "../components/Register";
import Profile from "../components/UserProfile/Profile";
import Products from "../components/PartnerPage";
import Partners from "../components/Partners";
import DeliveryAdress from "../components/UserProfile/DeliveryAdressList";
import NewDeliveryAdress from "../components/UserProfile/AddDeliveryAdress";

function Routes() {
  return (
    <Router>
      <Fragment>
        <Route exact path="/products/:partnerId" component={Products} />
        <Route exact path="/partners" component={Partners} />
        <Route exact path="/" component={Partners} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={SignUp} />
        <Route exact path="/my-profile" component={Profile} />
        <Route exact path="/my-adress" component={DeliveryAdress} />
        <Route exact path="/new-adress" component={NewDeliveryAdress} />
      </Fragment>
    </Router>
  );
}

export default Routes;
