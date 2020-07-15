import React from "react";
import "../../css/Loading/FlashMessage.css";
function FlashMessages(props) {
  return (
    <div role="alert">
      {props.messages.map((msg, index) => {
        return (
          <div key={index}>
            <div className="popup">
              <h2>{msg}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FlashMessages;
