import React, { PureComponent } from "react";
import classNames from "classnames";

import Mana from "./Mana";
import { rules } from "../shared/games.js";

export default class PlayerUI extends PureComponent {
  render() {
    const { turn, exactTurn, usedMana, reserveMana } = this.props;

    const exactMana = exactTurn * rules.manaPerTurn - usedMana;
    const mana = Math.max(0, Math.min(Math.floor(exactMana), rules.maxMana));
    const overloading = exactMana >= rules.maxMana;

    const duration =
      rules.secondsPerTurn - rules.secondsPerTurn * (exactTurn - turn);

    return (
      <div className="playerUI safeAreaMargins">
        <div className="manaBar">
          <div
            className={classNames({
              reserveMana: true,
              hidden: !reserveMana > 0,
            })}
          >
            <Mana filled={true} current={true}>
              +{reserveMana}
            </Mana>
          </div>

          <div className="currentMana">
            {[...Array(rules.maxMana)].map((nada, index) => {
              const number = index + 1;
              const filled = number <= mana;
              const current = number === mana;
              const next = number === mana + 1;

              return (
                <Mana
                  key={index}
                  filled={filled}
                  current={current || (overloading && number === rules.maxMana)}
                  fillingIn={next && duration}
                >
                  {number}
                </Mana>
              );
            })}
          </div>

          <div className="overloadingMana">
            <Mana
              hidden={!overloading}
              overloading={true}
              fillingIn={overloading && duration}
            >
              X
            </Mana>
          </div>
        </div>
      </div>
    );
  }
}
