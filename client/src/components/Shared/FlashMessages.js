import React from "react";

function FlashMessages(props) {
  return (
    <div className="alert alert-success" role="alert">
      {props.messages.map((msg, index) => {
        return <div key={index}>{msg}</div>;
      })}
    </div>
  );
}

export default FlashMessages;
