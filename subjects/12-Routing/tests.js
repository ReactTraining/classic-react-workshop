import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import assert from "../assert";

function toArray(nodeList) {
  return Array.prototype.slice.call(nodeList, 0);
}

export function run(component) {
  window.location.hash = "";

  const node = ReactDOM.findDOMNode(component);
  const peopleList = node.querySelector(".people-list");
  const profileLinks = toArray(node.querySelectorAll(".people-list a"));
  const profileHrefFormat = /\/profile\/\d+$/;

  console.log("on first render");

  assert(peopleList, "render the list of people");
  assert(
    profileLinks.length &&
      profileLinks.every(
        link =>
          link && profileHrefFormat.test(link.getAttribute("href"))
      ),
    "render links to the profile page"
  );

  console.log("after clicking on a profile link...");

  if (profileLinks.length) {
    Simulate.click(profileLinks[1], { button: 0 });
  }

  assert(node.querySelector(".profile"), "show the profile page");
}
