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
    ReactDOM.render(<Tabs data={FixtureData} />, node);

    // fixture
    const activeFixture = document.createElement("div");
    activeFixture.setAttribute("style", "border-bottom-color: #000");
    activeBorderBottomColor = activeFixture.style.borderBottomColor;

    // Append to the document if you want to play with it.
    // document.body.appendChild(node);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it("renders the USA tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[0].innerText).toEqual(FixtureData[0].label);
  });

  it("renders the Brazil tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[1].innerText).toEqual(FixtureData[1].label);
  });

  it("renders the Russia tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[2].innerText).toEqual(FixtureData[2].label);
  });

  it("activates the first tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[0].style.borderBottomColor).toEqual(
      activeBorderBottomColor
    );
  });

  it("does not activate the second tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[1].style.borderBottomColor).not.toEqual(
      activeBorderBottomColor
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
        activeBorderBottomColor
      );
    });

    it("deactivates the first tab", () => {
      const tabs = node.querySelectorAll(".Tab");
      expect(tabs[0].style.borderBottomColor).not.toEqual(
        activeBorderBottomColor
      );
    });

    it("puts the correct content in the panel", () => {
      const panel = node.querySelector(".TabPanel");
      expect(panel.innerText).toEqual(FixtureData[1].content);
    });
  });
});
