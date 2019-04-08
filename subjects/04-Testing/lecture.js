import "./mocha-setup";

import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import { Simulate } from "react-dom/test-utils";
import expect from "expect";

import ContentToggle from "./components/ContentToggle";
import StatefulContentToggle from "./components/StatefulContentToggle";
import Droppable from "./components/Droppable";

// describe("ContentToggle", () => {
//   let node;
//   beforeEach(() => {
//     node = document.createElement("div");
//   });

//   it("displays the summary", () => {
//     ReactDOM.render(<ContentToggle summary="The Summary" />, node);

//     expect(node.innerHTML).toMatch(
//       /The Summary/,
//       '"The Summary" was not found in HTML'
//     );
//   });

//   describe("isOpen prop", () => {
//     it("does not display children when false", () => {
//       ReactDOM.render(
//         <ContentToggle isOpen={false} summary="The Summary">
//           <p>Cheers</p>
//         </ContentToggle>,
//         node
//       );

//       expect(node.innerHTML).toNotMatch(
//         /Cheers/,
//         '"Cheers" was found in HTML'
//       );
//     });

//     it("defaults to false", () => {
//       ReactDOM.render(
//         <ContentToggle summary="The Summary">
//           <p>Cheers</p>
//         </ContentToggle>,
//         node
//       );

//       expect(node.innerHTML).toNotMatch(
//         /Cheers/,
//         '"Cheers" was found in HTML'
//       );
//     });

//     it("displays children when true", () => {
//       ReactDOM.render(
//         <ContentToggle isOpen={true} summary="The Summary">
//           <p>Cheers</p>
//         </ContentToggle>,
//         node
//       );

//       expect(node.innerHTML).toMatch(
//         /Cheers/,
//         '"Cheers" was not found in HTML'
//       );
//     });
//   });
// });

// describe("StatefulContentToggle", () => {
//   let node;
//   beforeEach(() => {
//     node = document.createElement("div");
//   });

//   it("opens when clicked", () => {
//     ReactDOM.render(
//       <StatefulContentToggle summary="The Summary">
//         <p>The Content</p>
//       </StatefulContentToggle>,
//       node
//     );

//     Simulate.click(node.querySelector("button"));

//     expect(node.innerHTML).toMatch(
//       /The Content/,
//       '"The Content" was not found in HTML'
//     );
//   });
// });

// describe("Droppable", () => {
//   let node;
//   beforeEach(() => {
//     node = document.createElement("div");
//   });

//   it("accepts files", () => {
//     ReactDOM.render(<Droppable />, node);
//     Simulate.dragOver(node.querySelector("div.Droppable"), {
//       dataTransfer: { types: ["Files"] }
//     });
//     expect(node.innerHTML).toMatch(
//       /Drop it!/,
//       '"Drop it!" was not found in HTML'
//     );
//   });
// });

// - render to a node that isn't in the dom
// - match innerHTML
// - renderToString
// - Simulate
// - actually render something
// - getDefaultProps for application modules
// - shallow renderer
// - assert on vdom
