import { Simulate } from "react-dom/test-utils";

import assert from "../assert";

export function run() {
  const node = document.getElementById("app").firstChild;
  const button = node.querySelector("button");

  Simulate.click(button);

  assert(
    node.innerHTML.match(/STEP TWO/),
    "clicking the button goes to Step 2"
  );
}
