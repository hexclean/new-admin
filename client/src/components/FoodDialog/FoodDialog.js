import React, { useState } from "react";

export function FoodDialog({ openFood, setOpenFood, setOrders, orders }) {
  function close() {
    setOpenFood();
  }
  const order = {
    name: "Gordon Bleu",
  };
  function addToOrder() {
    setOrders([...orders, order]);
    close();
  }

  if (!openFood) return null;
  return openFood ? (
    <div>
      <div onClick={close}>fsdfds</div>{" "}
      <button onClick={addToOrder}>Add to order</button>
    </div>
  ) : null;
}

export default FoodDialog;
