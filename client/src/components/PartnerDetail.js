import React from "react";
import { useOpenFood } from "./Hooks/useOpenFood";
import { FoodDialog } from "./FoodDialog/FoodDialog";
import { Order } from "./Order/Order";
import PartnerPage from "./PartnerPage";
import { useOrders } from "./Hooks/useOrders";
function PartnerDetail() {
  const openFood = useOpenFood();
  const orders = useOrders();
  return (
    <>
      <FoodDialog {...openFood} {...orders} />
      <Order {...orders} />
      <PartnerPage {...openFood} />
    </>
  );
}

export default PartnerDetail;
