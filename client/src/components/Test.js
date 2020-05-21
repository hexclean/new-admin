import React, { useState, useEffect } from "react";
import axios from "axios";

function Test() {
  let [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        if (response.data) {
          setUsers(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getHeroes = () => {
    const heroesList = [];
    users.map((user, index) =>
      heroesList.push(
        <h1 key={user.id}>
          {user.id} {user.productFinals[0].id}
        </h1>
      )
    );
    return heroesList;
  };

  return (
    <div className="App">
      das
      <h2>{getHeroes()}</h2>
    </div>
  );
}

export default Test;
