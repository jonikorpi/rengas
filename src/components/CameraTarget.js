import React from "react";

class CameraTarget extends React.PureComponent {
  componentDidMount() {
    this.focusOnTarget();
  }

  componentDidUpdate() {
    this.focusOnTarget();
  }

  focusOnTarget = () => {
    const dimensions = this.element.getBoundingClientRect();
    const y =
      window.pageYOffset +
      dimensions.top +
      dimensions.height / 2 -
      window.innerHeight / 2;
    window.scrollTo(0, y);
  };

  render() {
    return (
      <div
        className="cameraTarget"
        ref={ref => {
          this.element = ref;
        }}
      />
    );
  }
}

export default CameraTarget;
