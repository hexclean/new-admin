import React, { useState, useEffect } from "react";
import axios from "axios";

function Test() {
  let [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("/api/restaurants")
      .then((response) => {
        console.log("responseresponseresponse", response);
        if (response.users) {
          console.log("responseresponseresponse", response);
          setUsers(response.users);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getHeroes = () => {
    const heroesList = [];
    console.log("users", users);

    users.map((users, index) =>
      heroesList.push(<div index={index} key={users.id} users={users} />)
    );
    return heroesList;
  };

  return (
    <div className="App">
      das
      <h2>{users && getHeroes()}</h2>
    </div>
  );
}

export default Test;
