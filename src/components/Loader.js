import React from "react";

const Loader = ({ error, pastDelay, timedOut }) => {
  const message =
    error || timedOut
      ? "Component download failed. Please refresh!"
      : "Downloading components…";

  return pastDelay ? message : null;
};

export default Loader;
