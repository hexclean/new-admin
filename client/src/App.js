import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./routes/Routes";
import { FoodDialog } from "./components/FoodDialog/FoodDialog";
function App() {
  return (
    <>
      <Router>
        <Fragment>
          <Route component={Routes} />
        </Fragment>
      </Router>
    </>
  );
}

export default App;
