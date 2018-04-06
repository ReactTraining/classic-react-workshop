import "./mocha-setup";

import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import { Simulate } from "react-addons-test-utils";
import expect from "expect";

import ContentToggle from "./components/ContentToggle";
import StatefulContentToggle from "./components/StatefulContentToggle";
import Tabs from "./components/Tabs";
import Droppable from "./components/Droppable";

describe("ContentToggle", () => {
  describe("using server rendering", () => {
    it("renders the summary in a button", () => {
      const element = (
        <ContentToggle summary="Tacos">
          <p>ARE GOOD</p>
        </ContentToggle>
      );

      // const node = document.createElement('div');
      const html = ReactDOMServer.renderToStaticMarkup(element);

      expect(html).toContain("Tacos");
    });

    it("does not render its content", () => {
      const element = (
        <ContentToggle summary="Tacos">
          <p>ARE GOOD</p>
        </ContentToggle>
      );

      const html = ReactDOMServer.renderToStaticMarkup(element);

      expect(html).toNotContain("ARE GOOD");
    });
  });

  describe("using a real browser", () => {
    it("renders the summary in a button", () => {
      const element = (
        <ContentToggle summary="Tacos">
          <p>ARE GOOD</p>
        </ContentToggle>
      );

      const node = document.createElement("div");

      ReactDOM.render(element, node);
      const html = node.innerHTML;

      expect(html).toContain("Tacos");
    });

    describe("when isOpen=true", () => {
      it("renders its content", () => {
        const element = (
          <ContentToggle isOpen summary="Tacos">
            <p>ARE GOOD</p>
          </ContentToggle>
        );

        const node = document.createElement("div");

        ReactDOM.render(element, node);
        const html = node.innerHTML;

        expect(html).toContain("ARE GOOD");
      });
    });
  });
});

describe("StatefulContentToggle", () => {
  it("renders the summary in a button", () => {
    const element = (
      <StatefulContentToggle summary="Tacos">
        <p>ARE GOOD</p>
      </StatefulContentToggle>
    );

    const node = document.createElement("div");

    ReactDOM.render(element, node);
    const html = node.innerHTML;

    expect(html).toContain("Tacos");
  });

  it("does not render its content", () => {
    const element = (
      <StatefulContentToggle summary="Tacos">
        <p>ARE GOOD</p>
      </StatefulContentToggle>
    );

    const node = document.createElement("div");

    ReactDOM.render(element, node);
    const html = node.innerHTML;

    expect(html).toNotContain("ARE GOOD");
  });

  describe("when the button is clicked", () => {
    it("shows its content", () => {
      const element = (
        <StatefulContentToggle summary="Tacos">
          <p>ARE GOOD</p>
        </StatefulContentToggle>
      );

      const node = document.createElement("div");

      ReactDOM.render(element, node);

      // Click on the button!
      Simulate.click(node.querySelector("button"));

      const html = node.innerHTML;

      expect(html).toContain("ARE GOOD");
    });
  });
});

describe("Tabs", () => {
  describe("by default", () => {
    it("shows the content from the first tab", () => {
      const element = (
        <Tabs
          data={[
            { label: "ONE", content: "THE BEGINNING" },
            { label: "TWO", content: "THE END" }
          ]}
        />
      );

      const node = document.createElement("div");

      ReactDOM.render(element, node);
      const html = node.innerHTML;

      expect(html).toContain("THE BEGINNING");
    });
  });

  describe("when the second tab is clicked", () => {
    it("shows the content from the second tab", () => {
      const element = (
        <Tabs
          data={[
            { label: "ONE", content: "THE BEGINNING" },
            { label: "TWO", content: "THE END" }
          ]}
        />
      );

      const node = document.createElement("div");

      ReactDOM.render(element, node);
      Simulate.click(node.querySelectorAll(".Tab")[1]);
      const html = node.innerHTML;

      expect(html).toContain("THE END");
    });
  });
});

describe("Droppable", () => {
  describe("when a file is about to be dropped", () => {
    it("says 'Drop it!'", () => {
      const element = <Droppable />;
      const node = document.createElement("div");

      ReactDOM.render(element, node);

      Simulate.dragOver(node.firstChild, {
        dataTransfer: {
          types: ["Files"]
        }
      });

      expect(node.innerHTML).toContain("Drop it!");
    });
  });
});
