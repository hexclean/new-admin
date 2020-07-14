import React, { Fragment, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../components/Authentication/Home";
import Register from "../components/Authentication/Register";
import Profile from "../components/UserProfile/Profile";
import Index from "../components/PartnerPage/Index";
import Partners from "../components/Partners";
import DeliveryAdress from "../components/UserProfile/DeliveryAdressList";
import NewDeliveryAdress from "../components/UserProfile/AddDeliveryAdress";
import Header from "../components/Header/Header";
import ViewSingleDeliveryAdress from "../components/UserProfile/ViewSingleDeliveryAdress";
import FlashMessages from "../components/Shared/FlashMessages";
function Routes() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [flashMessages, setFlashMessages] = useState([]);

  function addFlashMessage(msg) {
    setFlashMessages((prev) => prev.concat(msg));
  }

  return (
    <BrowserRouter>
      <FlashMessages messages={flashMessages} />

      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route exact path="/products/:partnerId" component={Index} />
        <Route exact path="/partners" component={Partners} />
        <Route exact path="/">
          {loggedIn ? <Home /> : <Profile />}
        </Route>
        <Route exact path="/delivery-adress/:id">
          <ViewSingleDeliveryAdress />
        </Route>
        <Route exact path="/registration" component={Register} />
        <Route exact path="/my-profile" component={Profile} />
        <Route exact path="/my-adress" component={DeliveryAdress} />
        <Route path="/new-adress">
          <NewDeliveryAdress addFlashMessage={addFlashMessage} />
        </Route>
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
