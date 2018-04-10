import React from "react";
import convertNumberToEnglish from "./utils/convertNumberToEnglish";
import computeHSLRainbowColor from "./utils/computeHSLRainbowColor";

export const numColors = 100;

export const rowHeight = 30;

export function renderRowAtIndex(index) {
  return (
    <div
      style={{
        height: rowHeight,
        color: computeHSLRainbowColor(index, numColors),
        padding: "5px 10px",
        fontSize: 24
      }}
    >
      {convertNumberToEnglish(index + 1)}
    </div>
  );
}
