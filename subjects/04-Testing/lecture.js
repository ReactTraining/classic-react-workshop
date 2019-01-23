import "./mocha-setup";

import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import { Simulate } from "react-dom/test-utils";
import expect from "expect";

import ContentToggle from "./components/ContentToggle";
import StatefulContentToggle from "./components/StatefulContentToggle";
import Tabs from "./components/Tabs";
import Droppable from "./components/Droppable";

// describe("ContentToggle", () => {
//   let node;
//   beforeEach(() => {
//     node = document.createElement("div");
//   });

//   describe("by default", () => {
//     it("is closed", () => {
//       ReactDOM.render(
//         <ContentToggle summary="Tacos">
//           <p>are great</p>
//         </ContentToggle>,
//         node
//       );

//       expect(node.innerHTML).not.toContain("are great");
//     });
//   });

//   describe("with isOpen=true", () => {
//     it("is open", () => {
//       ReactDOM.render(
//         <ContentToggle summary="Tacos" isOpen={true}>
//           <p>are great</p>
//         </ContentToggle>,
//         node
//       );

//       expect(node.innerHTML).toContain("are great");
//     });
//   });
// });

// describe("StatefulContentToggle", () => {
//   let node;
//   beforeEach(() => {
//     node = document.createElement("div");
//   });

//   describe("by default", () => {
//     it("is closed", () => {
//       ReactDOM.render(
//         <StatefulContentToggle summary="Tacos">
//           <p>are great</p>
//         </StatefulContentToggle>,
//         node
//       );

//       expect(node.innerHTML).not.toContain("are great");
//     });
//   });

//   describe("after its button is clicked", () => {
//     it("is open", () => {
//       ReactDOM.render(
//         <StatefulContentToggle summary="Tacos">
//           <p>are great</p>
//         </StatefulContentToggle>,
//         node
//       );

//       const button = node.querySelector("button");
//       Simulate.click(button);

//       expect(node.innerHTML).toContain("are great");
//     });
//   });
// });

describe("Droppable", () => {
  let node;
  beforeEach(() => {
    node = document.createElement("div");
  });

  it("works", () => {
    ReactDOM.render(<Droppable />, node);

    Simulate.dragOver(node.firstChild, {
      dataTransfer: {
        types: ["Files"]
      }
    });

    expect(node.innerHTML).toContain("Drop it!");
  });
});
