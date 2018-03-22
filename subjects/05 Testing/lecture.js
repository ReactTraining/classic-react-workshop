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
  let node;
  beforeEach(() => {
    node = document.createElement("div");
  });

  describe("by default", () => {
    it("is closed", done => {
      ReactDOM.render(
        <ContentToggle summary="the summary">
          <p>the content</p>
        </ContentToggle>,
        node,
        () => {
          expect(node.innerHTML).toNotMatch(/the content/);
          done();
        }
      );
    });
  });

  describe("when isOpen=true", () => {
    it("is open", done => {
      ReactDOM.render(
        <ContentToggle summary="the summary" isOpen>
          <p>the content</p>
        </ContentToggle>,
        node,
        () => {
          expect(node.innerHTML).toMatch(/the content/);
          done();
        }
      );
    });
  });

  describe("on the server", () => {
    describe("when isOpen=true", () => {
      it("is open", () => {
        const html = ReactDOMServer.renderToString(
          <ContentToggle summary="the summary" isOpen>
            <p>the content</p>
          </ContentToggle>
        );

        expect(html).toMatch(/the content/);
      });
    });
  });
});

describe("StatefulContentToggle", () => {
  let node;
  beforeEach(() => {
    node = document.createElement("div");
  });

  describe("by default", () => {
    it("is closed", done => {
      ReactDOM.render(
        <StatefulContentToggle summary="the summary">
          <p>the content</p>
        </StatefulContentToggle>,
        node,
        () => {
          expect(node.innerHTML).toNotMatch(/the content/);
          done();
        }
      );
    });
  });

  describe("when the button is clicked", () => {
    it("is open", done => {
      ReactDOM.render(
        <StatefulContentToggle summary="the summary">
          <p>the content</p>
        </StatefulContentToggle>,
        node,
        function() {
          Simulate.click(node.querySelector("button"));

          expect(node.innerHTML).toMatch(/the content/);

          done();
        }
      );
    });
  });
});

describe("Droppable", () => {
  let node;
  beforeEach(() => {
    node = document.createElement("div");
    document.body.appendChild(node);
  });

  it.only("works", done => {
    ReactDOM.render(<Droppable />, node, () => {
      Simulate.dragOver(node.firstChild, {
        dataTransfer: { types: ["Files"] }
      });

      expect(node.innerHTML).toMatch(/Drop it/);
      done();
    });
  });
});
