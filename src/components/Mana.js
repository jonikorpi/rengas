import React from "react";
import classNames from "classnames";

import ProgressClock from "./ProgressClock";

const Mana = ({
  filled,
  current,
  overloading,
  hidden,
  children,
  fillingIn,
}) => {
  const clockVisible = !hidden && (fillingIn || overloading);

  return (
    <div className="manaContainer">
      {clockVisible && (
        <ProgressClock
          color={overloading ? "red" : "white"}
          duration={`${fillingIn}s`}
          repeat={overloading}
        />
      )}

      <div
        className={classNames({
          mana: true,
          current: current,
          filled: filled,
          overloading: overloading,
          hidden: hidden,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default Mana;
