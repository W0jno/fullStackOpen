import React from "react";
import "../styles/styles.css";

function Notification({ message, error }) {
  if (message !== null) {
    return <div className="addedSuccesfuly">{message}</div>;
  } else if (error !== null) {
    //console.log(error);
    return <div className="error">{error}</div>;
  }
  return null;
}

export default Notification;
