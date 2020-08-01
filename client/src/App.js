import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./routes/Routes";
import { useTranslation } from "react-i18next";
function App() {
  const { t, i18n } = useTranslation();
  function handleClick(lang) {
    i18n.changeLanguage(lang);
  }

  return (
    <>
      <Router>
        <button onClick={() => handleClick("en")}>English</button>
        <button onClick={() => handleClick("ro")}>Romanian</button>
        <button onClick={() => handleClick("hu")}>Hungarian</button>
        <p>{t("Thanks.1")}</p>
        <p>{t("Why.1")}</p>
        <Fragment>
          <Route component={Routes} />
        </Fragment>
      </Router>
    </>
  );
}

export default App;
