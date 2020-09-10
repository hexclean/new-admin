import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
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
import EditDeliveryAddress from "../components/UserProfile/EditDeliveryAddress";

function Routes() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("token")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("token"),
    },
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user = action.data;
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
  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("token", state.user.token);
    } else {
      localStorage.removeItem("token");
    }
  }, [state.loggedIn]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Switch>
            <Route path="/my-adress">
              {!state.loggedIn ? (
                <Redirect to={"/partners"} />
              ) : (
                <DeliveryAdress />
              )}
            </Route>
            <Route path="/registration">
              {state.loggedIn ? <Redirect to={"/"} /> : <DeliveryAdress />}
              <Register />
            </Route>
            <Route exact path="/my-profile" component={Profile} />
            <Route path="/new-adress">
              <NewDeliveryAdress />
            </Route>
            <Route
              exact
              path="/delivery-adress/:id/edit"
              component={EditDeliveryAddress}
            />
            <Route
              exact
              path="/delivery-adress/:id/edit"
              component={EditDeliveryAddress}
            />
            <Route exact path="/:locationName/:partnerId" component={Index} />
            <Route exact path="/">
              {state.loggedIn ? <Home /> : <Home />}
            </Route>
            <Route
              exact
              path="/delivery-adress/:id"
              component={ViewSingleDeliveryAdress}
            />
            <Route path="/:locationName" component={Partners} />
            <Route
              exact
              path="/delivery-adress/:id/edit"
              component={EditDeliveryAddress}
            />
            />
          </Switch>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default Routes;
