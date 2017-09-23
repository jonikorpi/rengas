import React, { PureComponent } from "react";
import { rules } from "../shared/games.js";

export default class PlayerUI extends PureComponent {
  render() {
    const { turn, exactTurn, lastCommand, lastMana, reserveMana } = this.props;

    const exactMana = exactTurn - lastCommand + lastMana;
    const mana = Math.max(
      0,
      Math.min(Math.floor(exactTurn - lastCommand + lastMana), rules.maxMana)
    );
    const overloading = exactMana >= rules.maxMana;

    const duration =
      rules.secondsPerTurn - rules.secondsPerTurn * (exactTurn - turn);

    return (
      <div className="playerUI">
        <div className="manaBar">
          <div className="reserveMana">(+{reserveMana})</div>

          {/* TODO: two rotating halves */}
          <div
            className={`manaRegen ${overloading
              ? "overloading"
              : "notOverloading"}`}
            style={{
              "--position": mana,
              "--duration": `${duration}s`,
            }}
          />
        </div>

        <div className="currentMana">
          {[...Array(rules.maxMana)].map((nada, index) => {
            const filled = index + 1 <= mana;
            const current = index + 1 === mana;

            return (
              <div
                className={`mana ${filled ? "filled" : "notFilled"} ${current
                  ? "current"
                  : "notCurrent"}`}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
