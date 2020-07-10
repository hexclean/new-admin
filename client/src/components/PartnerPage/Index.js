import React, { useState } from "react";
import FoodDialog from "../FoodDialog/FoodDialog";
import PartnerPage from "../PartnerPage";

function Index() {
  const [openFood, setOpenFood] = useState();
  return (
    <>
      {/* <FoodDialog openFood={openFood} /> */}
      <PartnerPage />
    </>
  );
}

export default Index;
