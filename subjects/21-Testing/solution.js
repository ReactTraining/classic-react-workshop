////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Fill in the test stubs to make the tests pass
////////////////////////////////////////////////////////////////////////////////
import "./mocha-setup";

import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import expect from "expect";

import Tabs from "./components/Tabs";

const FixtureData = [
  {
    label: "USA",
    content: "Land of the Free, Home of the brave"
  },
  { label: "Brazil", content: "Sunshine, beaches, and Carnival" },
  { label: "Russia", content: "World Cup 2018!" }
];

describe("when <Tabs> is rendered", () => {
  let node, activeBorderBottomColor;
  beforeEach(() => {
    node = document.createElement("div");

    const activeTab = document.createElement("div");
    activeTab.setAttribute("style", "border-bottom-color: #000");
    activeBorderBottomColor = activeTab.style.borderBottomColor;

    ReactDOM.render(<Tabs data={FixtureData} />, node);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it("renders the USA tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[0].innerText).toEqual(
      FixtureData[0].label,
      "USA tab was not rendered"
    );
  });

  it("renders the Brazil tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[1].innerText).toEqual(
      FixtureData[1].label,
      "Brazil tab was not rendered"
    );
  });

  it("renders the Russia tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[2].innerText).toEqual(
      FixtureData[2].label,
      "Russia tab was not rendered"
    );
  });

  it("activates the first tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[0].style.borderBottomColor).toEqual(
      activeBorderBottomColor,
      "First tab is not active"
    );
  });

  it("does not activate the second tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[1].style.borderBottomColor).not.toEqual(
      activeBorderBottomColor,
      "Second tab is active"
    );
  });

  describe("after clicking the second tab", () => {
    beforeEach(() => {
      const tabs = node.querySelectorAll(".Tab");
      Simulate.click(tabs[1]);
    });

    it("activates the second tab", () => {
      const tabs = node.querySelectorAll(".Tab");
      expect(tabs[1].style.borderBottomColor).toEqual(
        activeBorderBottomColor,
        "Second tab is not active"
      );
    });

    it("deactivates the first tab", () => {
      const tabs = node.querySelectorAll(".Tab");
      expect(tabs[0].style.borderBottomColor).not.toEqual(
        activeBorderBottomColor,
        "First tab is active"
      );
    });

    it("puts the correct content in the panel", () => {
      const panel = node.querySelector(".TabPanel");
      expect(panel.innerText).toEqual(
        FixtureData[1].content,
        "Correct content is not in the panel"
      );
    });
  });
});
