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
  let node, activeTab;
  beforeEach(() => {
    node = document.createElement("div");

    ReactDOM.render(<Tabs data={data} />, node);

    activeTab = document.createElement("div");
    activeTab.setAttribute("style", "border-bottom-color: #000");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it("renders the first tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[0].innerText).toEqual(data[0].name);
  });

  it("renders the second tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[1].innerText).toEqual(data[1].name);
  });

  it("renders the third tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[2].innerText).toEqual(data[2].name);
  });

  it("activates the first tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[0].style.borderBottomColor).toEqual(
      activeTab.style.borderBottomColor
    );
  });

  it("does not activate the second tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[1].style.borderBottomColor).not.toEqual(
      activeTab.style.borderBottomColor
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
        activeTab.style.borderBottomColor
      );
    });

    it("deactivates the first tab", () => {
      const tabs = node.querySelectorAll(".Tab");
      expect(tabs[0].style.borderBottomColor).not.toEqual(
        activeTab.style.borderBottomColor
      );
    });

    it("puts the correct content in the panel", () => {
      const panel = node.querySelector(".TabPanel");
      expect(panel.innerText).toEqual(data[1].description);
    });
  });
});
