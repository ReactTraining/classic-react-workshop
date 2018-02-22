import $ from "jquery";
import { search } from "./utils/searchWikipedia";

const html = `
<div>
  <h1>Wikipedia</h1>
  <form id="form">
    <input id="input" value="taco"/>
    <button type="submit">Search</button>
  </form>
  <div id="loading">Loading...</div>
  <div id="meta">
    <p>Results for: <span id="title"></span><p>
    <p>
      <label>
        <input type="checkbox" id="descending">
        Sort Descending
      </label>
    </p>
  </div>
  <ul id="results"></ul>
</div>
`;

$("#app").html(html); // <-- component

$("#form")
  .on("submit", event => {
    // <-- state change
    event.preventDefault();
    const term = $("#input").val(); // <-- state
    $("#loading").show(); // <-- time
    $("#meta").hide(); // <-- time
    $("#results").empty(); // <-- time
    search(term, (err, results) => {
      $("#loading").hide(); // <-- time
      $("#meta").show(); // <-- time
      $("#title").html(term); // <-- time
      results.forEach(result => {
        const li = $("<li/>");
        const html = `
<div>
  ${result.title}
  <button>show more</button>
</div>
<div class="toggler" style="display: none">
  <p>${result.description}</p>
</div>
`;
        li.html(html); // <-- time
        if ($("#descending").is(":checked")) {
          // <-- state
          li.prependTo($("#results")); // <-- time
        } else {
          li.appendTo($("#results")); // <-- time
        }
        li.find("button").on("click", () => {
          // <-- component
          li.find(".toggler").toggle(); // <-- time
          const isHidden = li.find(".toggler").is(":hidden"); // <-- state
          li.find("button").html(isHidden ? "show more" : "hide"); // <-- time
        });
      });
    });
  })
  .trigger("submit"); // <-- state change

$("#descending").on("click", event => {
  // <-- state change
  $("#results li").each((i, li) => {
    $("#results").prepend(li); // <-- time
  });
});

// What's awesome:
//
// I can still bang out this code even after not using jQuery for
// 4 years.
//
// What's not awesome:
//
// When our code...
//
// - is written as flows
// - doesn't call out state
// - has no entry point to change state
//
// ...it gets really hard to deal with. After you identify state,
// and how to change it, you must write code to connect every state
// to nearly every other state. Every feature requires changes to code
// in multiple places. Also, it's just too hard to think about for most
// of us, leading to lots of bugs.

////////////////////////////////////////////////////////////////////////////////

// import Backbone from "backbone";
// import $ from "jquery";
// import _ from "underscore";
// import { search } from "./utils/searchWikipedia";

// const appTemplate = _.template(`
// <div>
//   <h1><%= title %></h1>
//   <form id="form">
//     <input id="input" value="taco"/>
//     <button type="submit">Search</button>
//   </form>
//   <% if (loading) { %>
//     <div id="loading">Loading...</div>
//   <% } else { %>
//     <div id="meta">
//       <p>Results for: <span id="title"><%= term %></span><p>
//       <p>
//         <label>
//         <input type="checkbox" id="descending" <%= descending ? 'checked' : '' %>>
//         Sort Descending
//         </label>
//       </p>
//     </div>
//   <% } %>
//   <ul id="results">
//     <% results.forEach(function(result) { %>
//       <li class="toggleView"></li>
//     <% }) %>
//   </ul>
// </div>
// `);

// const AppView = Backbone.View.extend({
//   template: appTemplate,

//   events: {
//     // <-- delegated state changes
//     "submit #form": "handleSubmit",
//     "click #descending": "handleDescending"
//   },

//   initialize() {
//     this.listenTo(this.model, "all", this.render);
//     this.listenTo(this.model, "change:term", this.search);
//     this.render();
//     this.search();
//   },

//   handleSubmit(event) {
//     event.preventDefault();
//     this.model.set("term", this.$el.find("#input").val()); // KVO Web
//   },

//   search() {
//     this.model.set({
//       // KVO web
//       loading: true,
//       results: [],
//       descending: false // cascading update!
//     });
//     search(this.model.get("term"), (err, results) => {
//       this.model.set({
//         // KVO web
//         loading: false,
//         results: results
//       });
//     });
//   },

//   handleDescending() {
//     this.model.set(
//       // <-- KVO web
//       "descending",
//       !this.model.get("descending")
//     );
//   },

//   render() {
//     const state = this.model.toJSON();
//     if (state.descending)
//       state.results = state.results.slice(0).reverse();
//     this.$el.html(this.template(state)); // DOM Bomb!
//     this.$el.find("#results li").each((index, el) => {
//       new ToggleView({
//         // <-- imperative (re)composition!
//         el: el,
//         model: new Backbone.Model(state.results[index])
//       }).render();
//     });
//   }
// });

// const ToggleView = Backbone.View.extend({
//   template: _.template(`
// <div>
//   <%= title %>
//   <button>show more</button>
// </div>
// <% if (isOpen) { %>
// <div>
//   <p><%= description %></p>
// </div>
// <% } %>
// `),

//   events: {
//     "click button": "toggle"
//   },

//   initialize() {
//     this.model.set("isOpen", false, { silent: true }); // <-- model ownership?
//     this.listenTo(this.model, "change:isOpen", this.render);
//   },

//   toggle() {
//     this.model.set("isOpen", !this.model.get("isOpen")); // <-- KVO web
//   },

//   render() {
//     this.$el.html(this.template(this.model.toJSON()));
//   }
// });

// new AppView({
//   el: "#app",
//   model: new Backbone.Model({
//     title: "Wikipedia",
//     loading: false,
//     term: "tacos",
//     descending: false,
//     results: []
//   })
// });

// What's awesome
//
// - Moved state to models so we can identify what state changes
//   the app.
// - Moved creating UI into templates, one step closer to being
//   declarative.
//
// What's not so awesome
//
// - DOM Bombs
//   - kill focus for assistive devices
//   - non-performant
//
// - KVO Web
//   - can't predict what will happen if you change state
//     > Events complect communication and flow of control.
//     > ... their fundamental nature, ... is that upon an event
//     > an arbitrary amount of other code is run
//     > http://clojure.com/blog/2013/06/28/clojure-core-async-channels.html
//
//   - leads to cascading updates
//     - non-performant
//     - to fix leads to knowing how your app changes over time intimately
//
// - imperative composition
//   - non-performant
//   - to fix
//     - have to know how your app changes over time intimately
//     - lots of code to manage instances
//     - lots of mistakes

////////////////////////////////////////////////////////////////////////////////

// import angular from "angular";
// import { search } from "./utils/searchWikipedia";

// document.documentElement.setAttribute("ng-app", "wikipedia");

// document.getElementById("app").innerHTML = `
// <div ng-controller="MainController as main">
//   <h1>Wikipedia</h1>
//   <form ng-submit="main.handleSubmit()">
//     <input ng-model="main.term"/>
//     <button type="submit">Search</button>
//   </form>
//   <div ng-if="main.loading">Loading...</div>
//   <div>
//     <p>{{main.sortedResults().length}} results for: {{main.term}}<p>
//     <p>
//       <label>
//         <input
//         type="checkbox"
//         ng-model="main.descending"
//         > Sort Descending
//       </label>
//     </p>
//   </div>
//   <ul id="results">
//     <li ng-repeat="result in main.sortedResults() track by result.title">
//       <toggler title="{{result.title}}">
//         <p>{{result.description}}</p>
//       </toggler>
//     </li>
//   </ul>
// </div>
// `;

// const app = angular.module("wikipedia", []);

// app.controller("MainController", function($rootScope) {
//   const main = this;
//   main.term = "taco"; // <-- shared state!
//   main.results = [];
//   main.loading = false;
//   main.descending = false;

//   main.getFriends = () => {
//     return [{ name: "Sarah" }, { name: "Max" }];
//   };

//   main.handleSubmit = () => {
//     main.loading = true;
//     search(main.term, (err, results) => {
//       main.results = results;
//       main.loading = false;
//       $rootScope.$digest(); // <-- time!
//     });
//   };

//   main.sortedResults = () => {
//     return main.descending
//       ? main.results.slice(0).reverse()
//       : main.results;
//   };

//   main.handleSubmit();
// });

// app.directive("toggler", () => {
//   // <-- Global!
//   return {
//     restrict: "E", // WTH?
//     scope: {
//       title: "@" // WTH?
//     },
//     controller($scope) {
//       $scope.isOpen = false;
//       $scope.toggle = () => {
//         $scope.isOpen = !$scope.isOpen;
//       };
//     },
//     replace: true,
//     transclude: true, // WTH?
//     template: `
// <div>
//   <div>
//     {{title}}
//     <button ng-click="toggle()">show more</button>
//   </div>
//   <div ng-if="isOpen" ng-transclude></div>
// <div>
// `
//   };
// });

// What's awesome
//
// - fully declarative templates
// - declarative component composition
//
// What's not so awesome
//
// - directives and filters are globals
// - have to think about time with $apply/$watch, etc.
// - rendering assumptions require you to keep object identity
//   and therefore think about time
// - and the real kicker: shared mutable state
//
// > July 7, 2014
// >
// > Vojta brought up some points that we don’t yet have plans to solve
// > some problems we see in larger apps.  In particular, how developers
// > can reason about data flow within an app.
// >
// > Key points: scope hierarchy is a huge pile of shared state that many
// > components from the application because of two way data-binding it's
// > not clear what how the data flows because it can flow in all
// > directions (including from child components to parents) - this makes
// > it hard to understand the app and understand of impact of model
// > changes in one part of the app on another (seemingly unrelated) part
// > of it.
//   https://twitter.com/teozaurus/status/518071391959388160
