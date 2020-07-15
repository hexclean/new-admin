import React, { useReducer } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useImmerReducer } from "use-immer";
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
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function Routes() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("token")),
    flashMessages: [],
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        return;
      case "logout":
        draft.loggedIn = false;
        return;
      case "flashMessage":
        draft.flashMessages.push(action.value);
        return;
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Switch>
            <Route exact path="/products/:partnerId" component={Index} />
            <Route exact path="/partners" component={Partners} />
            <Route exact path="/">
              {state.loggedIn ? <Home /> : <Profile />}
            </Route>
            <Route exact path="/delivery-adress/:id">
              <ViewSingleDeliveryAdress />
            </Route>
            <Route exact path="/delivery-adress/:id/edit">
              <Partners />
            </Route>
            <Route exact path="/registration" component={Register} />
            <Route exact path="/my-profile" component={Profile} />
            <Route exact path="/my-adress" component={DeliveryAdress} />
            <Route path="/new-adress">
              <NewDeliveryAdress />
            </Route>
            />
          </Switch>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default Routes;
