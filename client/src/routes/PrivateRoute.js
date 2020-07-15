import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import DispatchContext from "../DispatchContext";

function PrivateRoute() {
  const appDispatch = useContext(DispatchContext);

  //   !appDispatch({ type: "login" });

  return <Redirect to={"/login"} />;
}

export default PrivateRoute;
