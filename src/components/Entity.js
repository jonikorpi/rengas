import React from "react";
import "web-animations-js";

const Entity = ({ children, state, moving, casting, events }) => {
  const { exactX = 0, exactY = 0 } = state && state.position;
  const dynamicProps = {
    fromX: exactX,
    fromY: exactY,
    toX: moving && moving.position ? moving.position.exactX : undefined,
    toY: moving && moving.position ? moving.position.exactY : undefined,
    time: moving && moving.time,
    speed: moving && moving.speed,
  };

  return (
    <React.Fragment>
      <Dynamic {...dynamicProps}>
        <div
          className="flex justify-center align-center"
          style={{ color: "red", height: "100%" }}
        >
          P
        </div>
      </Dynamic>
      <Dynamic {...dynamicProps} z={1}>
        <div
          className="flex justify-center align-center"
          style={{ color: "orange", height: "100%" }}
        >
          P
        </div>
      </Dynamic>
      <Dynamic {...dynamicProps} z={2}>
        <div
          className="flex justify-center align-center"
          style={{ color: "yellow", height: "100%" }}
        >
          P
        </div>
      </Dynamic>
      {children && (
        <Dynamic {...dynamicProps} z={2}>
          {children}
        </Dynamic>
      )}
    </React.Fragment>
  );
};

class Dynamic extends React.PureComponent {
  animations = [];

  componentDidMount() {
    this.setupAnimations();
  }

  componentDidUpdate() {
    this.setupAnimations();
  }

  setupAnimations = () => {
    const { fromX, fromY, toX, toY, time, speed } = this.props;
    let { animations, element } = this;

    if (animations.length > 0) {
      animations.forEach(animation => animation.cancel());
      animations = [];
    }

    if (toX !== undefined && toY !== undefined) {
      const distance = Math.sqrt(
        Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2)
      );
      const animation = element.animate(
        [
          { transform: createTransform(fromX, fromY) },
          { transform: createTransform(toX, toY) },
        ],
        {
          duration: speed * distance * 1000,
          easing: "linear",
          fill: "both",
        }
      );

      animation.startTime = time - performance.timing.navigationStart;
      animations.push(animation);
    } else {
      element.style.setProperty("transform", createTransform(fromX, fromY));
    }
  };

  render() {
    const { children, z, width, height } = this.props;

    return (
      <div
        className="dynamic"
        ref={ref => (this.element = ref)}
        style={{ "--z": z, "--width": width, "--height": height }}
      >
        {children}
      </div>
    );
  }
}

const createTransform = (x = 0, y = 0) => `
  translate3d(
    calc((0.5 + ${x}) * var(--unit)),
    calc((0.5 + ${y}) * var(--unit)),
    0
  )
  translate(-50%, -50%)
`;

export default Entity;
