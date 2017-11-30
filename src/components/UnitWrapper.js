import React from "react";

import UnitDataFetcher from "./UnitDataFetcher";

export default class UnitWrapper extends React.PureComponent {
  render() {
    return <UnitDataFetcher {...this.props} />;
  }
}
