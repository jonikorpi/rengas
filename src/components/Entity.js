import React from "react";

const Entity = ({ children, state, moving, casting, events }) => {
  const { x, y, exactX, exactY } = moving ? moving : state;

  return (
    <React.Fragment>
      <div
        ref={ref => {
          this.element = ref;
        }}
        className="dynamic flex justify-center align-center"
        style={{ "--x": exactX, "--y": exactY, "--z": 2, color: "yellow" }}
      >
        P
      </div>
      <div
        className="dynamic flex justify-center align-center"
        style={{ "--x": exactX, "--y": exactY, "--z": 1, color: "orange" }}
      >
        P
      </div>
      <div
        className="dynamic flex justify-center align-center"
        style={{ "--x": exactX, "--y": exactY, color: "red" }}
      >
        P
      </div>

      {children}
    </React.Fragment>
  );
};

export default Entity;
