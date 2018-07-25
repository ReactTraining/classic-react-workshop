import { Simulate } from "react-dom/test-utils";

import assert from "../assert";

export function run() {
  const node = document.getElementById("app").firstChild;

  const activeFixture = document.createElement("div");
  activeFixture.setAttribute("style", "border-bottom-color: #000");
  const activeBorderBottomColor = activeFixture.style.borderBottomColor;

  console.log("on the initial render");

  assert(!!node.innerHTML.match(/Soccer/), "render the Soccer tab");
  assert(!!node.innerHTML.match(/Baseball/), "render the Baseball tab");
  assert(!!node.innerHTML.match(/Tennis/), "render the Tennis tab");

  const tabs = node.querySelectorAll(".Tab");

  assert(
    tabs[0] &&
      tabs[0].style.borderBottomColor === activeBorderBottomColor,
    "first tab is active"
  );
  assert(
    tabs[1] &&
      tabs[1].style.borderBottomColor !== activeBorderBottomColor,
    "second tab is not active"
  );

  console.log("after clicking the second tab...");

  Simulate.click(tabs[1]);

  assert(
    tabs[1] &&
      tabs[1].style.borderBottomColor === activeBorderBottomColor,
    "second tab is active"
  );
  assert(
    tabs[0] &&
      tabs[0].style.borderBottomColor !== activeBorderBottomColor,
    "first tab is not active"
  );

  const panel = node.querySelector(".TabPanel");

  assert(
    panel && /Baseball/.test(panel.textContent),
    "panel has the correct content"
  );

  Simulate.click(tabs[0]);
}
