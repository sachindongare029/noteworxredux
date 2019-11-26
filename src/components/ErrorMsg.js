import React from 'react'

function ErrorMsg({ type, emptyInput, handleMsgChange }) {
  const dom = (
    <div className="error-container">
      {type} is required
      <i
        className="fa fa-times"
        aria-hidden="true"
        onClick={() => {
          if (emptyInput === "both" && type === "Title") {
            handleMsgChange('content')
          } else if (emptyInput === "both" && type === "Content") {
            handleMsgChange("title");
          } else {
            handleMsgChange("");
          }
        }}
      ></i>
    </div>
  );
  return dom;
}
export default ErrorMsg;