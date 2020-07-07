import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/UserProfile/DeliveryAdressList.css";
import axios from "axios";
import Menu from "../Shared/Menu";

const DeliveryAdressList = () => {
  return (
    <div>
      <div class="main-content cimet-page">
        <div class="container">
          <div class="row">
            <Menu />
            <div class="col-md-8">
              <div class="white-box">
                <form action="">
                  <h2 class="text-center">Title Goes Here</h2>

                  <div class="row">
                    <div class="col-6">
                      <div class="contact-box text-center">
                        <a href="#" class="radius-50 custom-address">
                          <i class="fa fa-home" aria-hidden="true"></i>
                        </a>
                        <h4>This is Title</h4>
                        <p>Lorem Ipsum is simply dummy text of the printing.</p>
                        <p>
                          <a href="#">Link 1</a> <a href="#">Link 2</a>
                        </p>
                      </div>
                    </div>

                    <div class="col-6">
                      <div class="contact-box text-center">
                        <a href="#" class="radius-50 custom-address">
                          <i class="fa fa-home" aria-hidden="true"></i>
                        </a>
                        <h4>This is Title</h4>
                        <p>Lorem Ipsum is simply dummy text of the printing.</p>
                        <p>
                          <a href="#">Link 1</a> <a href="#">Link 2</a>
                        </p>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="contact-box text-center">
                        <a href="#" class="radius-50 custom-address">
                          <i class="fa fa-home" aria-hidden="true"></i>
                        </a>
                        <h4>This is Title</h4>
                        <p>Lorem Ipsum is simply dummy text of the printing.</p>
                        <p>
                          <a href="#">Link 1</a> <a href="#">Link 2</a>
                        </p>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="contact-box text-center">
                        <a href="#" class="radius-50 custom-address">
                          <i class="fa fa-home" aria-hidden="true"></i>
                        </a>
                        <h4>This is Title</h4>
                        <p>Lorem Ipsum is simply dummy text of the printing.</p>
                        <p>
                          <a href="#">Link 1</a> <a href="#">Link 2</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group text-center">
                        <Link to={"/new-adress"}>
                          <button type="submit" class="btn-green">
                            This is a button
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAdressList;
