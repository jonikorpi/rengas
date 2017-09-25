import React, { PureComponent } from "react";

import Mana from "./Mana";
import { rules } from "../shared/games.js";

export default class PlayerUI extends PureComponent {
  render() {
    const { mana } = this.props;

    return (
      <div className="playerUI">
        <div className="manaBar">
          {[...Array(rules.maxMana)].map((nada, index) => {
            const number = index + 1;

            return (
              <Mana
                key={number}
                filled={number <= mana}
                current={number === mana}
              >
                {number}
              </Mana>
            );
          })}
        </div>
      </div>
    );
  }
}
