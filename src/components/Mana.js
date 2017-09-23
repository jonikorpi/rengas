import React from "react";
import classNames from "classnames";

const Mana = ({
  filled,
  current,
  fillingIn,
  repeatingFill,
  overloading,
  hidden,
  children,
}) => {
  return (
    <div
      className={classNames({
        mana: true,
        current: current,
        filled: filled,
        overloading: overloading,
        hidden: hidden,
      })}
      style={{
        animation:
          fillingIn &&
          `manaFilling ${fillingIn}s ease-in ${repeatingFill
            ? "infinite"
            : 1} both`,
      }}
    >
      {children}
    </div>
  );
};

export default Mana;
