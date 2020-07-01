import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [login] = useState(false);
  const [password, setPassword] = useState("");

  const loginpress = () => {
    axios
      .post("/api/auth", {
        username: email,
        password: password,
      })
      .then((response) => {
        const token = response.data.token;

        localStorage.setItem("x-auth", token);
        console.log(token);
      });
  };

  return (
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
  );
};

export default Login;
