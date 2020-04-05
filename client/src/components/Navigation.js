import React from "react";
import "../css/Navigation.css";

export const Navigation = () => (
  <div>
    <div class="mainnv">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0 col-md-5 col-lg-5">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Restaurants <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Subscription
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled text-yellow" href="#">
                  Download App
                </a>
              </li>
            </ul>

            <div class="mx-auto col-md-4 col-lg-5">
              <a href="#" class="navbar-brand">
                <img src="data:image/webp;base64,UklGRugEAABXRUJQVlA4TNwEAAAvbkAVECenoG0bJvxJ718E8z//BJK2eNuvyG3bBjmNDvobgCz4WJB3A6NHJMhUibKylJdyjIKAOWSwJwMchM0Wi7KLdrSAoHbb1rE3O7Ht1LZt27Zt27Ztpw1q27YVZ/2TPrmu+777XC++RfR/AhomJzn54vaC4rLNnSTF08nLPMRqv5XJSerJy7vj7CelXQ1BPXeaZQFp6CZ3ddjDUq4Ga5DZzbJkrSQ3wadKhuFJEcOQGm4Y1noahqmmye5mGJ5VNwy3ChqGk17uJruCTaxwXt6Rcbb2D7eL0c4bIo60Ia+F46b/ZbyrbBguFjEMO30MwwLTMNw06a0Mw+vyhuFKtGHY4pwpboJ5jpkfab2/s/JGOITMn5Z/G+UsPjYSCXSCnRMdxr2y4v9X5Yy3491jKzjnI27rbtsUK9gmx93V16Kxr61g6TF39amRNPlpBV/cVmORoZlW6LuPRiKy3DQhRw0jcbcMIxU+uBMmO0A6Zv4FeVaTPc4JMsZxeZubW92yeWFHyEbHjRRH2hGU4rTpf5tEXzOM1HllGBmQbhiZYRqPjYaRwFOGkch7hpEG6YaRoaaReabx2GkYCT5lGCn+yDDSMt0wMtA0ssw0nge1umsx0xlDtX40sUpiUjRSC/XqqVveGSUG9lTv3SnWMik2oKdqr8byv66Hd4Cnbb5Fqxfxt8vHx8uOAG+VhmfSxtsTPWhz8t23d1K3Dgyzrt3ifclnTu9a3MAS3z4rD6WdObZ5ciFXfWGXLSNvkf+NKRb1TPuJ649HWupNuJSD6/tbCvzRFdbZELYxB/h18cq5TwC7/C0IXf8b4Ou5rwBfJ3moFTjIn0+uZgM8bWWb93bg8tDE8Ijw+M4XgD0+WkH7gIfTKyeEJ5Sf8QjuF1aKTYa8G6NLxEQWbH7wN3xrZdckyFkdKq7Dl+TCQq0FkLWxsLguuOtRCy8Vr92QOdtfXHq3eg0vS9tT5iOs8RTFVfC2kkbl77BEVIuLco9MGCOKdT/AJls8xsO9BFGNug+z1bwWwbVYJXWfo7BLlHvlkl3JjrBkGCrq/eBMsFLcC3K7ieVVP5FbQS3kPEyxo9gvvtXWKPOLL1WUysKDQtb1hSuBajITDthRDu4X1yj6lJy6Sh3gqId1M2Czn0bXHM7aUd6CgjdIr6U0AA6L8r7knVEKc2GDr0b9TyTZUQ4eltQo8ZoMtfaQ5Kf0k88FFGbBJp1+WZy2I/EROe01GuRxr4hSOXhVUek5DxMUesC1MI35sMOOwP2wTmMj7PZQinsMI6yr8Aaaqfmch5F2SDdIb6JUPxv6i7LnfLgaa5nshdMeSmMhs6ItkefhanmFivfhQqialE+HI8EKTzQaA7NUGr6DNV5dYallUv4XPOqZT9/H8KumaHpMB45WzafgRw1ZD6xOzKf/G3iVIF0hZeCIfGcW05D2GcCJJd2rd5l/HPjdUrS99gNvNnWvXa9ax9U34VNBpdBTwPVlravXrTfpMPC6hvyh3EVHGt8HyH6TBXC7qVgYMA8g+92H1+kA8/2VJG4dwPc37z8A3KkiIt00umlJobEPcH1jVEGxtvEO8s3ZVtdLND2bJ5Hvh0kFRUQKduuq2qeAnkhspf4rli0eVj1aLPevMGD1sfO75gwu5S8WhpUfu/FY6pZFbRPFJQ==" />
              </a>
              <a class="nav-link text-yellow" href="#">
                Be my partner
              </a>
            </div>

            <ul class="navbar-nav ml-auto col-md-3 mt-2 mt-lg-0 align-right col-lg-2">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <img src="data:image/webp;base64,UklGRnQBAABXRUJQVlA4TGgBAAAvI4AIENejoG0bxvxJ77Qg5n/+FbZt24YqqVuR27YNcpot8w2MGQgARADAzAGEjQBAAAKYDEaCiTABBACrKADhHK9kCMaKjQAWJgQIInD2SBHuMx/8jH4J4pcBCyKACf6gu+UjAACItm2bbk5sFqmD2gxr27YVG+f7L87NF0T0fwJA3BpaO79/Opz3gsLuZ2TX1k1k/iQKHlMZH1E4RjSH4nd6mgOJ+hCJ610CEyRdaZlNEn9Z5oSmInNK0leS2Sdp+ZZZJoFjmVGaWYk3O431RSwBxMMFkQstFUyVeNcOoB94YGQ2bECt63GAZXx1ayfcqQF3K03HZeWmF9japeRfwiDnO8ojYuY+Hgj6R7Z/GoiNj4hZrO2giOxGuVyuIvdrwSIwmEPyCw1Hc4cKo5wZVHnLOVOC04x+VHvG2FOEIQDwZVVtAsAKqs60W12/ynBxLIzqU687TYD/k03weQkTVw93Sl93PU4=" />
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">
                  <img src="data:image/webp;base64,UklGRpIBAABXRUJQVlA4TIYBAAAvIoAIEMejoG0byfxJ35ONw/zPv8K2bdtQJXUTTdswV5W9gXEG7MH6FMA6hPgQByCABRAEAAtChDAhhDhPFysbHiYmwkR4CE0yRKExAcBKhg0Q1nJgon9lyJKMGwAQJEk2bfWzbZvfxv22bdvm7P++O++cHUT0fwKUw4PjHhPk/hIRDUoi9Y1XTufoMhFtzS2LXptMA/A9kdyHBKBfkkT9APpl9QLIvcv5TwOwHspZtgHAuJTfHNTVLxmrpgaWUxl1NF6UcGDWaP0S1wZN972wE4cWdoQpYPaKuvZy4t9i/hSwd8Q8u3jzYvrAHv4ket7d3WMfLpTArr0T/bRYmrQawbYdEz0VITf/RnRa7xBa1kq+kvi8BmYldGt5xi4vTs8vm704O73bCGkBzlDM7wryPe5wNGgENzmxPeBFk5XplXYDJ/VMREcB3hAR0YyZsU7qER3Hf6X6LjAeGywZOdkXFXUx9hsoOk7kVvVfZeQ/iOgmBraimrUzkFk8nkqCb2jfPFDsAAA=" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
);

export default Navigation;
