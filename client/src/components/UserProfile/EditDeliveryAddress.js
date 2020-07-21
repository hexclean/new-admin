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
    street: {
      value: "",
      hasErrors: false,
      message: "",
    },
    name: {
      value: "",
      hasErrors: false,
      message: "",
    },
    doorBell: {
      value: "",
      hasErrors: false,
      message: "",
    },
    doorNumber: {
      value: "",
      hasErrors: false,
      message: "",
    },
    floor: {
      value: "",
      hasErrors: false,
      message: "",
    },
    city: {
      value: "",
      hasErrors: false,
      message: "",
    },
    houseNumber: {
      value: "",
      hasErrors: false,
      message: "",
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
        draft.street.value = action.value.street;
        draft.city.value = action.value.city;
        draft.name.value = action.value.name;
        draft.doorBell.value = action.value.doorBell;
        draft.doorNumber.value = action.value.doorNumber;
        draft.floor.value = action.value.floor;
        draft.houseNumber.value = action.value.houseNumber;
        draft.isFetching = false;
        return;
      case "nameChange":
        draft.name.hasErrors = false;
        draft.name.value = action.value;
        return;
      case "streetChange":
        draft.street.value = action.value;
        return;
      case "cityChange":
        draft.city.hasErrors = false;
        draft.city.value = action.value;
        return;
      case "doorBellChange":
        draft.doorBell.value = action.value;
        return;
      case "doorNumberChange":
        draft.doorNumber.value = action.value;
        return;
      case "floorChange":
        draft.floor.value = action.value;
        return;
      case "houseNumberChange":
        draft.houseNumber.value = action.value;
        return;
      case "submitRequest":
        if (!draft.name.hasErrors && !draft.city.hasErrors) {
          draft.sendCount++;
        }
        return;
      case "saveRequestStarted":
        draft.isSaving = true;
        return;
      case "saveRequestFinished":
        draft.isSaving = false;
        return;
      case "nameRules":
        if (!action.value.trim()) {
          draft.name.hasErrors = true;
          draft.name.message = "Nem lehet ures";
        }
        return;
      case "cityRules":
        if (!action.value.trim()) {
          draft.city.hasErrors = true;
          draft.city.message = "Nem lehet ures";
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
      type: "nameRules",
      value: state.name.value,
    });
    dispatch({
      type: "cityRules",
      value: state.city.value,
    });
    dispatch({ type: "submitRequest" });
  }
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchDeliveryAddress() {
      try {
        const response = await api.get(
          `/deliveryadress/delivery-adress/${state.id}`,
          {
            cancelToken: ourRequest.token,
          }
        );
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
        console.log("There was a problem or the request was cancelled.");
      }
    }
    fetchDeliveryAddress();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  useEffect(() => {
    if (state.sendCount) {
      dispatch({ type: "saveRequestStarted" });
      const ourRequest = Axios.CancelToken.source();
      async function fetchDeliveryAddress() {
        try {
          const response = await api.post(
            `/deliveryadress/delivery-adress/${state.id}/edit`,
            {
              token: appState.user.token,
              name: state.name.value,
              street: state.street.value,
              city: state.city.value,
              doorBell: state.doorBell.value,
              doorNumber: state.doorNumber.value,
              floor: state.floor.value,
              houseNumber: state.houseNumber.value,
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
      fetchDeliveryAddress();
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
      <div className="main-content new-address">
        <div className="container">
          <div className="row">
            <Menu />
            <div className="col-12 col-lg-8">
              <div className="white-box">
                <form onSubmit={submitHandler}>
                  <h2 className="text-center">NEW ADDRESS</h2>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="title">
                          Cím neve <span>*</span>:
                        </label>
                        <input
                          onBlur={(e) =>
                            dispatch({
                              type: "nameRules",
                              value: e.target.value,
                            })
                          }
                          onChange={(e) =>
                            dispatch({
                              type: "nameChange",
                              value: e.target.value,
                            })
                          }
                          value={state.name.value}
                          type="text"
                          className="form-control"
                          id="name"
                        />
                        {state.name.hasErrors && (
                          <div className="alert alert-danger small liveValidateMessage">
                            {state.name.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="street">
                          Település <span>*</span>:
                        </label>
                        <input
                          onBlur={(e) =>
                            dispatch({
                              type: "cityRules",
                              value: e.target.value,
                            })
                          }
                          onChange={(e) =>
                            dispatch({
                              type: "cityChange",
                              value: e.target.value,
                            })
                          }
                          value={state.city.value}
                          type="text"
                          className="form-control"
                          id="city"
                        />
                        {state.city.hasErrors && (
                          <div className="alert alert-danger small liveValidateMessage">
                            {state.city.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="street">
                          Utca, közterület <span>*</span>:
                        </label>
                        <input
                          onChange={(e) =>
                            dispatch({
                              type: "streetChange",
                              value: e.target.value,
                            })
                          }
                          value={state.street.value}
                          type="text"
                          className="form-control"
                          id="street"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="street">
                          Cím részletek <span>*</span>:
                        </label>
                        <div className="row">
                          <div className="col-md-4">
                            <label htmlFor="house-number">
                              Házszám <span>*</span>:
                            </label>
                            <input
                              onChange={(e) =>
                                dispatch({
                                  type: "houseNumberChange",
                                  value: e.target.value,
                                })
                              }
                              value={state.houseNumber.value}
                              type="text"
                              className="form-control"
                              id="houseNumber"
                            />
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="floor">
                              Emelet <span>*</span>:
                            </label>
                            <input
                              onChange={(e) =>
                                dispatch({
                                  type: "floorChange",
                                  value: e.target.value,
                                })
                              }
                              value={state.floor.value}
                              type="text"
                              className="form-control"
                              id="floor"
                            />
                          </div>

                          <div className="col-md-4">
                            <label htmlFor="door">
                              Ajtó <span>*</span>:
                            </label>
                            <input
                              onChange={(e) =>
                                dispatch({
                                  type: "doorNumberChange",
                                  value: e.target.value,
                                })
                              }
                              value={state.doorNumber.value}
                              type="text"
                              className="form-control"
                              id="doorNumber"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="door-bell">
                          Kapucsengő <span>*</span>:
                        </label>
                        <input
                          onChange={(e) =>
                            dispatch({
                              type: "doorBellChange",
                              value: e.target.value,
                            })
                          }
                          value={state.doorBell.value}
                          type="text"
                          className="form-control"
                          id="doorBell"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group text-center">
                        <button
                          type="submit"
                          disabled={state.isSaving}
                          className="btn-green"
                        >
                          Update
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

export default withRouter(EditDeliveryAddress);
