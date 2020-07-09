import React, { useState } from "react";
import { useOpenFood } from "./Hooks/useOpenFood";
import { FoodDialog } from "./FoodDialog/FoodDialog";
import Navigation from "./Navigation";
function PartnerBanner() {
  return (
    <div>
      <div className="main-container">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-xl-9">
              <div className="hero-header">
                <div className="shadow">
                  <div className="logo">
                    <img src="images/logo1.png" alt="KFC Óbuda" />
                  </div>
                  <div className="info short">
                    <h1>fdsfdsf</h1>
                    <div className="adress-header">
                      1030 Budapest Szentendrei út 104
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnerBanner;
