import React from "react";
import classNames from "classnames";

const Mana = ({ filled, current, children }) => {
  return (
    <div
      className={classNames({
        mana: true,
        current: current,
        filled: filled,
      })}
    >
      {children}
    </div>
  );
};

export default Mana;
