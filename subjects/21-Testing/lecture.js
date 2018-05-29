import "./mocha-setup";

import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import { Simulate } from "react-dom/test-utils";
import expect from "expect";

import ContentToggle from "./components/ContentToggle";
import StatefulContentToggle from "./components/StatefulContentToggle";
import Droppable from "./components/Droppable";

describe("ContentToggle", () => {
  describe("by default", () => {
    it("renders the summary", () => {
      const node = document.createElement("div");

      ReactDOM.render(
        <ContentToggle summary="Tacos">
          <p>are the best</p>
        </ContentToggle>,
        node
      );

      const child = node.firstChild;

      expect(child.querySelector("button").innerText).toMatch(/Tacos/);
    });

    it("is closed", () => {
      const node = document.createElement("div");

      ReactDOM.render(
        <ContentToggle summary="Tacos">
          <p>are the best</p>
        </ContentToggle>,
        node
      );

      const child = node.firstChild;

      expect(child.innerHTML).not.toMatch(/are the best/);
    });
  });

  describe("when isOpen=true", () => {
    it("renders the children", () => {
      const node = document.createElement("div");

      ReactDOM.render(
        <ContentToggle summary="Tacos" isOpen>
          <p>are the best</p>
        </ContentToggle>,
        node
      );

      const child = node.firstChild;

      expect(child.innerHTML).toMatch(/are the best/);
    });
  });
});

describe("StatefulContentToggle", () => {
  describe("by default", () => {
    it("renders the summary", () => {
      const node = document.createElement("div");

      ReactDOM.render(
        <StatefulContentToggle summary="Tacos">
          <p>are the best</p>
        </StatefulContentToggle>,
        node
      );

      const child = node.firstChild;

      expect(child.querySelector("button").innerText).toMatch(/Tacos/);
    });

    it("is closed", () => {
      const node = document.createElement("div");

      ReactDOM.render(
        <StatefulContentToggle summary="Tacos">
          <p>are the best</p>
        </StatefulContentToggle>,
        node
      );

      const child = node.firstChild;

      expect(child.innerHTML).not.toMatch(/are the best/);
    });
  });

  describe("when its button is clicked", () => {
    it("renders the children", () => {
      const node = document.createElement("div");

      ReactDOM.render(
        <StatefulContentToggle summary="Tacos">
          <p>are the best</p>
        </StatefulContentToggle>,
        node
      );

      const child = node.firstChild;

      // Simulate user behavior!
      const button = child.querySelector("button");
      Simulate.click(button);

      expect(child.innerHTML).toMatch(/are the best/);
    });
  });
});

describe("Droppable", () => {
  it.only("works", () => {
    const node = document.createElement("div");

    ReactDOM.render(<Droppable />, node);

    const child = node.firstChild;

    Simulate.dragOver(child, {
      dataTransfer: { types: ["Files"] }
    });

    expect(child.innerHTML).toMatch(/Drop it!/);
  });
});
