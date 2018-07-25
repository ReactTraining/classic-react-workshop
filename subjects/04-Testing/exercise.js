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

import data from "./data";
import Tabs from "./components/Tabs";

describe("when <Tabs> is rendered", () => {
  let node;
  beforeEach(() => {
    node = document.createElement("div");
    ReactDOM.render(<Tabs data={data} />, node);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it("renders the first tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[0].innerText).toEqual(data[0].name);
  });

  it("renders the second tab");

  it("renders the third tab");

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
