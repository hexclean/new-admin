import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../../css/SignUp.css";

import { useImmerReducer } from "use-immer";
import { CSSTransition } from "react-transition-group";
import api from "../utils/api";
import Axios from "axios";

function Register() {
  const initialState = {
    email: {
      value: "",
      hasErrors: false,
      message: "",
      isUnique: false,
      checkCount: 0,
    },
    password: {
      value: "",
      hasErrors: false,
      message: "",
    },
    fullName: {
      value: "",
      hasErrors: false,
      message: "",
      isUnique: false,
      checkCount: 0,
    },
    phoneNumber: {
      value: "",
      hasErrors: false,
      message: "",
      isUnique: false,
      phoneNumber: 0,
    },
    submitCount: 0,
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "emailImmediately":
        draft.email.hasErrors = false;
        draft.email.value = action.value;
        return;
      case "emailAfterDelay":
        if (!/^\S+@\S+$/.test(draft.email.value)) {
          draft.email.hasErrors = true;
          draft.email.message = "You must provide a valid email address.";
        }
        if (!draft.email.hasErrors && !action.noRequest) {
          draft.email.checkCount++;
        }
        return;
      case "emailUniqueResults":
        if (action.value) {
          draft.email.hasErrors = true;
          draft.email.isUnique = false;
          draft.email.message = "That email is already being used.";
        } else {
          draft.email.isUnique = true;
        }
        return;

      case "passwordImmediately":
        draft.password.hasErrors = false;
        draft.password.value = action.value;
        if (draft.password.value.length > 50) {
          draft.password.hasErrors = true;
          draft.password.message = "Password cannot exceed 50 characters.";
        }
        return;
      case "passwordAfterDelay":
        if (draft.password.value.length < 12) {
          draft.password.hasErrors = true;
          draft.password.message = "Password must be at least 12 characters.";
        }
        return;

      case "fullNameImmediately":
        draft.fullName.hasErrors = false;
        draft.fullName.value = action.value;
        if (draft.fullName.value.length > 30) {
          draft.fullName.hasErrors = true;
          draft.fullName.message = "fullName cannot exceed 30 characters.";
        }
        if (
          draft.fullName.value &&
          !/^([a-zA-Z0-9]+)$/.test(draft.fullName.value)
        ) {
          draft.fullName.hasErrors = true;
          draft.fullName.message =
            "fullName can only contain letters and numbers.";
        }
        return;

      case "fullNameAfterDelay":
        if (draft.fullName.value.length < 3) {
          draft.fullName.hasErrors = true;
          draft.fullName.message = "fullName must be at least 3 characters.";
        }
        if (!draft.hasErrors && !action.noRequest) {
          draft.fullName.checkCount++;
        }
        return;
      case "fullNameUniqueResult":
        if (action.value) {
          draft.fullName.hasErrors = true;
          draft.fullName.isUnique = false;
          draft.fullName.message = "That fullName is already taken.";
        } else {
          draft.fullName.isUnique = true;
        }
        return;

      case "phoneNumberImmediately":
        draft.phoneNumber.hasErrors = false;
        draft.phoneNumber.value = action.value;
        if (draft.phoneNumber.value.length > 30) {
          draft.phoneNumber.hasErrors = true;
          draft.phoneNumber.message =
            "phoneNumber cannot exceed 30 characters.";
        }
        if (
          draft.phoneNumber.value &&
          !/^([a-zA-Z0-9]+)$/.test(draft.phoneNumber.value)
        ) {
          draft.phoneNumber.hasErrors = true;
          draft.phoneNumber.message =
            "phoneNumber can only contain letters and numbers.";
        }
        return;
      case "phoneNumberAfterDelay":
        if (draft.phoneNumber.value.length < 3) {
          draft.phoneNumber.hasErrors = true;
          draft.phoneNumber.message =
            "phoneNumber must be at least 3 characters.";
        }
        if (!draft.hasErrors && !action.noRequest) {
          draft.phoneNumber.checkCount++;
        }
        return;
      case "phoneNumberUniqueResult":
        if (action.value) {
          draft.phoneNumber.hasErrors = true;
          draft.phoneNumber.isUnique = false;
          draft.phoneNumber.message = "That phoneNumber is already taken.";
        } else {
          draft.phoneNumber.isUnique = true;
        }
        return;

      case "submitForm":
        if (
          !draft.email.hasErrors &&
          !draft.fullName.hasErrors &&
          !draft.phoneNumber.hasErrors &&
          !draft.password.hasErrors
        ) {
          draft.submitCount++;
        }
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(
        () => dispatch({ type: "emailAfterDelay" }),
        800
      );
      return () => clearTimeout(delay);
    }
  }, [state.email.value]);

  useEffect(() => {
    if (state.phoneNumber.value) {
      const delay = setTimeout(
        () => dispatch({ type: "phoneNumberAfterDelay" }),
        800
      );
      return () => clearTimeout(delay);
    }
  }, [state.phoneNumber.value]);

  useEffect(() => {
    if (state.password.value) {
      const delay = setTimeout(
        () => dispatch({ type: "passwordAfterDelay" }),
        800
      );
      return () => clearTimeout(delay);
    }
  }, [state.password.value]);

  useEffect(() => {
    if (state.fullName.value) {
      const delay = setTimeout(
        () => dispatch({ type: "fullNameAfterDelay" }),
        800
      );
      return () => clearTimeout(delay);
    }
  }, [state.fullName.value]);

  useEffect(() => {
    if (state.email.checkCount) {
      const ourRequest = Axios.CancelToken.source();
      async function fetchResults() {
        try {
          const response = await api.post(
            "/register/doesUsernameExist",
            { email: state.email.value },
            { cancelToken: ourRequest.token }
          );
          dispatch({ type: "emailUniqueResults", value: response.data });
        } catch (e) {
          console.log("There was a problem or the request was cancelled.");
        }
      }
      fetchResults();
      return () => ourRequest.cancel();
    }
  }, [state.email.checkCount]);

  useEffect(() => {
    if (state.submitCount) {
      const ourRequest = Axios.CancelToken.source();
      async function fetchResults() {
        try {
          const response = await api.post(
            "/register",
            {
              email: state.email.value,
              fullName: state.fullName.value,
              password: state.password.value,
              phoneNumber: state.phoneNumber.value,
            },
            { cancelToken: ourRequest.token }
          );
          // appDispatch({ type: "login", data: response.data });
        } catch (e) {
          console.log(e);
          console.log("There was a problem or the request was cancelled.");
        }
      }
      fetchResults();
      return () => ourRequest.cancel();
    }
  }, [state.submitCount]);

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "fullNameImmediately", value: state.fullName.value });
    dispatch({
      type: "fullNameAfterDelay",
      value: state.fullName.value,
      noRequest: true,
    });

    dispatch({ type: "emailImmediately", value: state.email.value });
    dispatch({
      type: "emailAfterDelay",
      value: state.email.value,
      noRequest: true,
    });

    dispatch({
      type: "phoneNumberImmediately",
      value: state.phoneNumber.value,
    });
    dispatch({
      type: "phoneNumberAfterDelay",
      value: state.phoneNumber.value,
      noRequest: true,
    });

    dispatch({ type: "passwordImmediately", value: state.password.value });
    dispatch({
      type: "passwordAfterDelay",
      value: state.password.value,
    });
    dispatch({ type: "submitForm" });
  }

  return (
    <div>
      <div className="main-container new-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 mx-auto">
              <div className="white-box">
                <form onSubmit={handleSubmit}>
                  <h2>FELHASZNÁLÓI ADATOK MEGADÁSA</h2>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group info-n text-center">
                        <label>
                          E-mail <span>*</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-8 ">
                      <div className="form-group ">
                        <input
                          autoComplete="off"
                          onChange={(e) =>
                            dispatch({
                              type: "emailImmediately",
                              value: e.target.value,
                            })
                          }
                          type="text"
                          className="form-control"
                          id="email"
                        />
                        <CSSTransition
                          in={state.email.hasErrors}
                          timeout={330}
                          classNames="liveValidateMessage"
                          unmountOnExit
                        >
                          <div className="alert alert-danger small liveValidateMessage">
                            {state.email.message}
                          </div>
                        </CSSTransition>
                        <p className="short-desc">
                          Később az email címed segítségével tudsz belépni
                          hozzánk.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="separator"></div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group info-n text-center">
                        <label>
                          Jelszó <span>*</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input
                          autoComplete="off"
                          onChange={(e) =>
                            dispatch({
                              type: "passwordImmediately",
                              value: e.target.value,
                            })
                          }
                          type="text"
                          className="form-control"
                          id="password"
                        />
                        <CSSTransition
                          in={state.password.hasErrors}
                          timeout={330}
                          classNames="liveValidateMessage"
                          unmountOnExit
                        >
                          <div className="alert alert-danger small liveValidateMessage">
                            {state.password.message}
                          </div>
                        </CSSTransition>
                        <p className="short-desc">
                          A jelszavadnak legalább 5 karakter hosszúnak kell
                          lennie. A fiókod biztonsága érdekében kerüld az
                          egyszerű jelszavak használatát!
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="separator"></div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group info-n text-center">
                        <label>
                          Név <span>*</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input
                          autoComplete="off"
                          onChange={(e) =>
                            dispatch({
                              type: "fullNameImmediately",
                              value: e.target.value,
                            })
                          }
                          type="text"
                          className="form-control"
                          id="fullName"
                        />
                        <CSSTransition
                          in={state.fullName.hasErrors}
                          timeout={330}
                          classNames="liveValidateMessage"
                          unmountOnExit
                        >
                          <div className="alert alert-danger small liveValidateMessage">
                            {state.fullName.message}
                          </div>
                        </CSSTransition>
                        <p className="short-desc">
                          A teljes nevedet érdemes megadni, hogy így könnyebben
                          elérjünk, és a kiszállításkor is gond nélkül
                          megtaláljunk.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group info-n text-center">
                        <label>
                          Telefonszám <span>*</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input
                          autoComplete="off"
                          onChange={(e) =>
                            dispatch({
                              type: "phoneNumberImmediately",
                              value: e.target.value,
                            })
                          }
                          type="text"
                          className="form-control"
                          id="phoneNumber"
                        />
                        <CSSTransition
                          in={state.phoneNumber.hasErrors}
                          timeout={330}
                          classNames="liveValidateMessage"
                          unmountOnExit
                        >
                          <div className="alert alert-danger small liveValidateMessage">
                            {state.phoneNumber.message}
                          </div>
                        </CSSTransition>
                        <p className="short-desc">
                          Mobiltelefonszámot érdemes megadnod, így közvetlenül
                          téged tudunk keresni. A telefonszám helyes formátuma:
                          +40753541070
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="separator"></div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group"></div>
                    </div>
                    <div className="col-md-8 cheked-title-text">
                      <label>
                        A regisztrációval tudomásul veszem és elfogadom
                      </label>
                      {/* <div className="gray-box">
                        <div className="form-group">
                          <label className="lable-container cheked-title-text">
                            az Általános Szerződési Feltételekben (ÁSZF)
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                          </label>
                          <label className="lable-container cheked-title-text">
                            és az Adatkezelési Tájékoztatóban foglaltakat
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div> */}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-8 d-flex justify-content-center">
                      <div className="form-group text-center">
                        <button type="submit" className="btn-green">
                          Regisztráció
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
