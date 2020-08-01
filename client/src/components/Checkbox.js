import React, { useEffect, useContext, useState } from "react";

const Checkbox = ({ categories }) => {
  const [checked, setCheked] = useState([]);

  const handleToggle = (c) => () => {
    // return the first index or -1
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state > push
    // else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    // console.log(newCheckedCategoryId);
    console.log("newCheckedCategoryId", newCheckedCategoryId);
    setCheked(newCheckedCategoryId);
    // handleFilters(newCheckedCategoryId);
  };
  return categories.map((c, i) => (
    <li key={c.id}>
      <div className="checkbox">
        <input
          onChange={handleToggle(c.id)}
          value={checked.indexOf(c.id === -1)}
          id={c.id}
          type="checkbox"
        />
        <label htmlFor={c.id}> {c.searchName}</label>
      </div>

      {/* <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          {c.searchName}
        </label>
      </div> */}
    </li>
  ));
};

export default Checkbox;
