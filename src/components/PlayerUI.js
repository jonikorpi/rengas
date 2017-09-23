import React, { PureComponent } from "react";
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
      <div className="playerUI">
        <div className="manaBar">
          <div className="reserveMana">
            <div className="reserveManaPlus">+</div>
            <Mana hidden={!reserveMana} filled={true} current={true}>
              {reserveMana}
            </Mana>
          </div>
          <div className="overloadingMana">
            <Mana
              hidden={!overloading}
              overloading={true}
              fillingIn={overloading && duration}
              repeatingFill={true}
            >
              X
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
                  filled={filled}
                  current={current || (overloading && number === rules.maxMana)}
                  fillingIn={next && duration}
                >
                  {number}
                </Mana>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
