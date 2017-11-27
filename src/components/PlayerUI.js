import React from "react";

import { rules } from "../shared/helpers.js";

export default class PlayerUI extends React.PureComponent {
  render() {
    const { mana } = this.props;

    return <div className="playerUI" />;
  }
}
