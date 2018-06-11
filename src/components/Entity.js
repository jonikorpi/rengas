import React from "react";

const Entity = ({ children, state, moving, casting, events }) => {
  const { x, y, exactX, exactY } = moving ? moving : state.position;

  return (
    <div className="entity" style={{ "--x": exactX, "--y": exactY }}>
      <div
        ref={ref => {
          this.element = ref;
        }}
        className="dynamic flex justify-center align-center"
        style={{ "--z": 2, color: "yellow" }}
      >
        P
      </div>
      <div
        className="dynamic flex justify-center align-center"
        style={{ "--z": 1, color: "orange" }}
      >
        P
      </div>
      <div
        className="dynamic flex justify-center align-center"
        style={{ color: "red" }}
      >
        P
      </div>

      {children && <div className="dynamic">{children}</div>}
    </div>
  );
};

export default Entity;
