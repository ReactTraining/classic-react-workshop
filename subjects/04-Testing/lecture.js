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
//   let div;
//   beforeEach(() => {
//     div = document.createElement("div");
//   });

//   it("displays the summary", () => {
//     ReactDOM.render(<ContentToggle summary="The Summary" />, div);

//     expect(div.innerHTML).toMatch(
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
//         div
//       );

//       expect(div.innerHTML).toNotMatch(
//         /Cheers/,
//         '"Cheers" was found in HTML'
//       );
//     });

//     it("defaults to false", () => {
//       ReactDOM.render(
//         <ContentToggle summary="The Summary">
//           <p>Cheers</p>
//         </ContentToggle>,
//         div
//       );

//       expect(div.innerHTML).toNotMatch(
//         /Cheers/,
//         '"Cheers" was found in HTML'
//       );
//     });

//     it("displays children when true", () => {
//       ReactDOM.render(
//         <ContentToggle isOpen={true} summary="The Summary">
//           <p>Cheers</p>
//         </ContentToggle>,
//         div
//       );

//       expect(div.innerHTML).toMatch(
//         /Cheers/,
//         '"Cheers" was not found in HTML'
//       );
//     });
//   });
// });

// describe("StatefulContentToggle", () => {
//   let div;
//   beforeEach(() => {
//     div = document.createElement("div");
//   });

//   it("opens when clicked", () => {
//     ReactDOM.render(
//       <StatefulContentToggle summary="The Summary">
//         <p>The Content</p>
//       </StatefulContentToggle>,
//       div
//     );

//     Simulate.click(div.querySelector("button"));

//     expect(div.innerHTML).toMatch(
//       /The Content/,
//       '"The Content" was not found in HTML'
//     );
//   });
// });

// describe("Droppable", () => {
//   let div;
//   beforeEach(() => {
//     div = document.createElement("div");
//   });

//   it("accepts files", () => {
//     ReactDOM.render(<Droppable />, div);
//     Simulate.dragOver(div.querySelector("div.Droppable"), {
//       dataTransfer: { types: ["Files"] }
//     });
//     expect(div.innerHTML).toMatch(
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
