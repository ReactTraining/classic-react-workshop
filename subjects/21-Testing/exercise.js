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
  let node;
  beforeEach(() => {
    node = document.createElement("div");
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

  it("renders the Brazil tab");

  it("renders the Russia tab");

  it("activates the first tab");

  it("does not activate the second tab");

  describe("after clicking the second tab", () => {
    beforeEach(() => {
      // TODO: simulate a click on the second tab
    });

    it("activates the second tab");

    it("deactivates the first tab");

    it("puts the correct content in the panel");
  });
});
