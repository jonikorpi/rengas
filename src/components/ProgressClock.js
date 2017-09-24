import React from "react";

import "./ProgressClock.css";

const ProgressClock = ({ duration, radius, color, repeat }) => {
  const fillStyles = {
    animationDuration: duration || "1s",
    animationIterationCount: repeat ? "infinite" : 1,
    backgroundColor: color,
  };

  return (
    <div className="progressClock" style={{ borderRadius: radius || "50%" }}>
      <div className="progressClockLeft progressClockHalf">
        <div className="progressClockFill" style={fillStyles} />
      </div>
      <div className="progressClockRight progressClockHalf">
        <div className="progressClockFill" style={fillStyles} />
      </div>
    </div>
  );
};

export default ProgressClock;
