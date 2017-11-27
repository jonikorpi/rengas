import React from "react";

import Tile from "./Tile";
import UnitIndicator from "./UnitIndicator";

export default class Location extends React.PureComponent {
  render() {
    const {
      trueSight,
      neighbourVisibleN,
      neighbourVisibleE,
      neighbourVisibleS,
      neighbourVisibleW,
      neighbourVisibleNW,
      neighbourVisibleNE,
      neighbourVisibleSE,
      neighbourVisibleSW,
    } = this.props;

    return [
      <Tile key="Tile" {...this.props} />,
      !trueSight && <UnitIndicator key="UnitIndicator" {...this.props} />,
    ];
  }
}

// {onEdge && (
//   <div className="wall" style={{ "--edgeDirection": onEdge }}>
//     <SVG
//       className="waterLine"
//       z={config.groundLevel}
//       scale={2}
//       zIndex={config.waterLevel - 1}
//     >
//       <Graphic type="waterLine" points={this.baseTile} />
//     </SVG>
//     <SVG
//       z={config.groundLevel}
//       zIndex={config.groundLevel - 1}
//       scale={0.5}
//     >
//       <Graphic
//         type="wall"
//         points={this.baseTile}
//         fill="var(--wallShadowBelow)"
//       />
//     </SVG>
//     <SVG
//       z={config.groundLevel + 3}
//       zIndex={config.shroudLevel - 2}
//       scale={-2}
//     >
//       <Graphic
//         type="wall"
//         points={this.baseTile}
//         fill="var(--wallShadow)"
//       />
//     </SVG>
//     <SVG
//       z={config.groundLevel + 5}
//       zIndex={config.shroudLevel - 1}
//       scale={-4}
//     >
//       <Graphic type="wall" points={this.baseTile} fill="var(--wall)" />
//     </SVG>
//   </div>
// )}
