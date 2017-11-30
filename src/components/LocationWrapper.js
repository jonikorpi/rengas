import React from "react";

import LocationDataFetcher from "./LocationDataFetcher";

export default class LocationWrapper extends React.PureComponent {
  render() {
    return <LocationDataFetcher {...this.props} />;
  }
}
