import React, { useEffect, useContext } from "react";
import { useParams, Link, withRouter } from "react-router-dom";
import "../../css/UserProfile/AddDeliveryAdress.css";
import Menu from "../Shared/Menu";
import api from "../utils/api";
import NotFound from "../Shared/NotFound";
import { useImmerReducer } from "use-immer";
import Axios from "axios";
import HamburgerLoading from "../Shared/HamburgerLoading";
import StateContext from "../../StateContext";
import DispatchContext from "../../DispatchContext";

function EditDeliveryAddress(props) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const originalState = {
    email: {
      value: "",
      hasErrors: false,
      message: "",
      checkCount: 0,
    },
    phoneNumber: {
      value: "",
      hasErrors: false,
      message: "",
      checkCount: 0,
    },
    fullName: {
      value: "",
      hasErrors: false,
      message: "",
      checkCount: 0,
    },
    isFetching: true,
    isSaving: false,
    id: useParams().id,
    sendCount: 0,
    notFound: false,
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "fetchComplete":
        draft.email.value = action.value.email;
        draft.phoneNumber.value = action.value.phoneNumber;
        draft.fullName.value = action.value.fullName;
        draft.isFetching = false;
        return;
      case "phoneNumberChange":
        draft.phoneNumber.hasErrors = false;
        draft.phoneNumber.value = action.value;
        return;
      case "emailChange":
        draft.email.hasErrors = false;
        draft.email.value = action.value;
        return;
      case "fullNameChange":
        draft.fullName.hasErrors = false;
        draft.fullName.value = action.value;
        return;
      case "submitRequest":
        if (
          !draft.phoneNumber.hasErrors &&
          !draft.fullName.hasErrors &&
          !draft.email.hasErrors
        ) {
          draft.sendCount++;
        }
        return;
      case "saveRequestStarted":
        draft.isSaving = true;
        return;
      case "saveRequestFinished":
        draft.isSaving = false;
        return;
      case "phoneNumberRules":
        if (!action.value.trim()) {
          draft.phoneNumber.hasErrors = true;
          draft.phoneNumber.message = "Nem lehet ures";
        }
        return;
      case "emailRules":
        if (!action.value.trim()) {
          draft.email.hasErrors = true;
          draft.email.message = "Nem lehet ures";
        }
        return;
      case "fullNameRules":
        if (!action.value.trim()) {
          draft.fullName.hasErrors = true;
          draft.fullName.message = "Nem lehet ures";
        }
        return;
      case "notFound":
        draft.notFound = true;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, originalState);

  function submitHandler(e) {
    e.preventDefault();
    dispatch({
      type: "phoneNumberRules",
      value: state.phoneNumber.value,
    });
    dispatch({
      type: "emailRules",
      value: state.email.value,
    });
    dispatch({
      type: "fullNameRules",
      value: state.fullName.value,
    });
    dispatch({ type: "submitRequest" });
  }

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchProfileData() {
      try {
        const response = await api.get("/profile/me", {
          cancelToken: ourRequest.token,
        });
        console.log(response);
        if (response.data) {
          dispatch({ type: "fetchComplete", value: response.data });
          if (appState.user.id != response.data.user.id) {
            appDispatch({ type: "flashMessage", value: "nincs jogod" });
            //redirect to homegae
            props.history.push("/");
          }
        } else {
          dispatch({ type: "notFound" });
        }
      } catch (e) {
        console.log(e);
        console.log("There was a problem or the request was cancelled.");
      }
    }
    fetchProfileData();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  // useEffect(() => {
  //   if (state.email.checkCount) {
  //     const ourRequest = Axios.CancelToken.source();
  //     async function fetchResults() {
  //       try {
  //         const response = await api.post(
  //           "/register/doesUsernameExist",
  //           { email: state.email.value },
  //           { cancelToken: ourRequest.token }
  //         );
  //         dispatch({ type: "emailUniqueResults", value: response.data });
  //       } catch (e) {
  //         console.log("There was a problem or the request was cancelled.");
  //       }
  //     }
  //     fetchResults();
  //     return () => ourRequest.cancel();
  //   }
  // }, [state.email.checkCount]);

  useEffect(() => {
    if (state.sendCount) {
      dispatch({ type: "saveRequestStarted" });
      const ourRequest = Axios.CancelToken.source();
      async function fetchProfileData() {
        try {
          const response = await api.post(
            "/profile/me",
            {
              token: appState.user.token,
              phoneNumber: state.phoneNumber.value,
              email: state.email.value,
              fullName: state.fullName.value,
            },
            {
              cancelToken: ourRequest.token,
            }
          );
          dispatch({ type: "saveRequestFinished" });
          appDispatch({ type: "flashMessage", value: "Sikeresen mentetted" });
        } catch (e) {
          console.log(e);
          console.log("There was a problem or the request was cancelled.");
        }
      }
      fetchProfileData();
      return () => {
        ourRequest.cancel();
      };
    }
  }, [state.sendCount]);

  if (state.isFetching) return <HamburgerLoading />;

  if (state.notFound) {
    return <NotFound />;
  }

  return (
    <div>
      <div className="main-content personal-data">
        <div className="container">
          <div className="row">
            <Menu />

            <div className="col-md-8">
              <div className="white-box">
                <form onSubmit={submitHandler}>
                  <h2>SZEMÉLYES ADATAIM SZERKESZTÉSE</h2>
                  <p>
                    Itt változtathatod meg a személyes adataidat, és
                    kapcsolhatod össze a már meglévő fiókodat a Facebook
                    profiloddal, hogy még gyorsabban és könnyebben rendelhess
                    legközelebb!
                  </p>
                  <div className="d-flex justify-content-center">
                    {/* <div className="row my-details">Személyes adataim</div> */}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group my-details-title">
                        <label htmlFor="email">
                          E-mail <span>*</span>:
                        </label>
                        <input
                          onBlur={(e) =>
                            dispatch({
                              type: "emailRules",
                              value: e.target.value,
                            })
                          }
                          onChange={(e) =>
                            dispatch({
                              type: "emailChange",
                              value: e.target.value,
                            })
                          }
                          value={state.email.value}
                          type="email"
                          className="form-control"
                          placeholder="E-mail"
                          id="email"
                        />
                        {state.email.hasErrors && (
                          <div className="alert alert-danger small liveValidateMessage">
                            {state.email.message}
                          </div>
                        )}
                        <p className="my-details-desc">
                          Később az email címed segítségével tudsz belépni
                          hozzánk.
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group my-details-title">
                        <label htmlFor="name">
                          Név <span>*</span>:
                        </label>
                        <input
                          onBlur={(e) =>
                            dispatch({
                              type: "fullNameRules",
                              value: e.target.value,
                            })
                          }
                          onChange={(e) =>
                            dispatch({
                              type: "fullNameChange",
                              value: e.target.value,
                            })
                          }
                          value={state.fullName.value}
                          type="text"
                          className="form-control"
                          placeholder="Név"
                          id="name"
                        />
                        {state.fullName.hasErrors && (
                          <div className="alert alert-danger small liveValidateMessage">
                            {state.fullName.message}
                          </div>
                        )}
                        <p className="my-details-desc">
                          A teljes nevedet érdemes megadni, hogy így könnyebben
                          elérjünk, és a kiszállításkor is gond nélkül
                          megtaláljunk.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group my-details-title">
                        <label htmlFor="phone">
                          Telefonszám <span>*</span>:
                        </label>
                        <input
                          onBlur={(e) =>
                            dispatch({
                              type: "phoneNumberRules",
                              value: e.target.value,
                            })
                          }
                          onChange={(e) =>
                            dispatch({
                              type: "phoneNumberChange",
                              value: e.target.value,
                            })
                          }
                          value={state.phoneNumber.value}
                          type="phone"
                          className="form-control"
                          placeholder="Telefonszám"
                          id="phone"
                        />
                        {state.phoneNumber.hasErrors && (
                          <div className="alert alert-danger small liveValidateMessage">
                            {state.phoneNumber.message}
                          </div>
                        )}
                        <p className="my-details-desc">
                          Mobiltelefonszámot érdemes megadnod, így közvetlenül
                          téged tudunk keresni. A telefonszám helyes formátuma:
                          0753541070
                        </p>

                        {/* <p>
                        A telefonszámod megerősítése számos előnnyel jár: be
                        tudod váltani akciós kuponjaidat, különleges
                        kiszolgálást kapsz ügyfélszolgálatunkon, és biztosan
                        elérnek az éttermek és futárok.
                      </p> */}
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                      <div className="form-group">
                        <button type="submit" className="btn-green">
                          MÓDOSÍTOM
                        </button>
                      </div>
                    </div>

                    {/* <div className="col-md-6">
                    <div className="form-group">
                      <a href="#" className="btn-blue">
                        <i
                          className="fa fa-facebook-square"
                          aria-hidden="true"
                        ></i>
                        Facebook connection
                      </a>
                      <p>
                        Link your NetWaiter account to your Facebook profile
                        so you can order next time even faster and easier!
                      </p>
                    </div>
                  </div> */}
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

export default withRouter(EditDeliveryAddress);
