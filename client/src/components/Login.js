import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
import axios from "axios";
import createHistory from "history/createBrowserHistory";
import { createBrowserHistory } from "history";
import { Redirect } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const tokenLocal = localStorage.getItem("x-auth");

  const loginpress = () => {
    axios
      .post("/api/auth", {
        username: email,
        password: password,
      })
      .then((response) => {
        try {
          const token = response.data.token;
          localStorage.setItem(
            "x-auth",
            JSON.stringify({
              login: true,
              token: token,
            })
          );

          console.log(token);
          console.log("react localstorage: ", localStorage);
        } catch (error) {
          console.log(error);
        }
      });
  };

  return (
    <div>
      {!tokenLocal ? (
        <div>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>adsd</div>
          <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={loginpress}>
            Log In
          </button>
        </div>
      ) : (
        <div>
          <h1>dsadadasd</h1>
        </div>
      )}
    </div>
  );
};

export default Login;
