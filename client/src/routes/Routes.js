import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../components/Authentication/Home";
import Register from "../components/Authentication/Register";
import Profile from "../components/UserProfile/Profile";
import Index from "../components/PartnerPage/Index";
import Partners from "../components/Partners";
import DeliveryAdress from "../components/UserProfile/DeliveryAdressList";
import NewDeliveryAdress from "../components/UserProfile/AddDeliveryAdress";
import Header from "../components/Header/Header";

function Routes() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  return (
    <Router>
      <Fragment>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Route exact path="/products/:partnerId" component={Index} />
        <Route exact path="/partners" component={Partners} />
        <Route exact path="/">
          {loggedIn ? <Home /> : <Profile />}
        </Route>
        <Route exact path="/registration" component={Register} />
        <Route exact path="/my-profile" component={Profile} />
        <Route exact path="/my-adress" component={DeliveryAdress} />
        <Route exact path="/new-adress" component={NewDeliveryAdress} />
      </Fragment>
    </Router>
  );
}

export default Routes;
