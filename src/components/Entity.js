import React from "react";

const Entity = ({ children, x = 0, y = 0 }) => {
  return (
    <React.Fragment>
      <div
        ref={ref => {
          this.element = ref;
        }}
        className="dynamic flex justify-center align-center"
        style={{ "--x": x, "--y": y, "--z": 2, color: "yellow" }}
      >
        P
      </div>
      <div
        className="dynamic flex justify-center align-center"
        style={{ "--x": x, "--y": y, "--z": 1, color: "orange" }}
      >
        P
      </div>
      <div
        className="dynamic flex justify-center align-center"
        style={{ "--x": x, "--y": y, color: "red" }}
      >
        P
      </div>

      {children}
    </React.Fragment>
  );
};

export default Entity;
