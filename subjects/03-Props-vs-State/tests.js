import { Simulate } from "react-dom/test-utils";

import assert from "../assert";

export function run() {
  const node = document.getElementById("app").firstChild;

  const tabs = node.querySelectorAll(".Tab");

  Simulate.click(tabs[1]);

  assert(node.innerHTML.match(/STEP TWO/), "clicking changes tabs");

  Simulate.click(tabs[0]);

  assert(node.innerHTML.match(/STEP ONE/), "clicking changes tabs");
}
