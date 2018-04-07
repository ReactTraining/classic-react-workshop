import React from "react";
import convertNumberToEnglish from "./utils/convertNumberToEnglish";
import computeHSLRainbowColor from "./utils/computeHSLRainbowColor";

const RainbowListDelegate = {
  numColors: 100,

  rowHeight: 30,

  renderRowAtIndex: index => (
    <div
      style={{
        height: RainbowListDelegate.rowHeight,
        color: computeHSLRainbowColor(
          index,
          RainbowListDelegate.numColors
        ),
        padding: "5px 10px",
        fontSize: 24
      }}
    >
      {convertNumberToEnglish(index + 1)}
    </div>
  )
};

export default RainbowListDelegate;
