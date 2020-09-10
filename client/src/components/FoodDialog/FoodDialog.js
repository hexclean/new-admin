import React, { useState } from "react";
import { QuantityInput } from "./QuantityInput";
import { useQuantity } from "../Hooks/useQuantity";
export function getPrice(order) {
  return order.quantity * order.price;
}

function FoodDialogContainer({ openFood, setOpenFood, setOrders, orders }) {
  const quantity = useQuantity(openFood && openFood.quantity);
  function close() {
    setOpenFood();
  }

  const order = {
    // ...openFood
    name: "Gordon Bleu",
    price: 13,
    quantity: quantity.value,
  };
  function addToOrder() {
    setOrders([...orders, order]);
    close();
  }

  return openFood ? (
    <div>
      <div onClick={close}>fsdfds</div> <QuantityInput quantity={quantity} />
      <button onClick={addToOrder}>Add to order {getPrice(order)}</button>
    </div>
  ) : null;
}

export function FoodDialog(props) {
  if (!props.openFood) return null;
  return <FoodDialogContainer {...props} />;
}

export default FoodDialog;
