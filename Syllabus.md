# Syllabus

This document contains a list of subjects we cover in our React training workshops. The stuff near the top is generally part of our "React Fundamentals" workshop and the stuff further down we generally cover in "Advanced React" workshops.

For any workshop, please be sure you are familiar with the material in our [JavaScript primer](https://github.com/ReactJSTraining/react-subjects/blob/master/JavaScriptPrimer.md) before attending.

## Eliminating Time

Solutions are nonsense without understanding the problems they solve. We'll take a trip down memory lane to shine a light on the stuff that led to all the bugs we've written in the past to prime us to see clearly how React is going to help.

Objectives:
- Understand the problems React solves
- Get people thinking about [the conceptual gap between the static program and the dynamic process][Dijkstra], and what it means to "eliminate time" in their apps

[Dijkstra]: https://en.wikiquote.org/wiki/Edsger_W._Dijkstra


## Rendering with React

We'll explore the lowest level of React: rendering UI. We'll take a look at what the "Virtual DOM" and JSX are, brush up on some JavaScript array methods, and do our first coding exercise.

Objectives:
- Render UI with React
- Transform and massage data into UI
- Become familiar with JSX
- Brush up on JavaScript expressions and scope


## Components

Components are the building blocks of UI in React. We'll discuss a few parts of a component's lifecycle, it's interface with the rest of the application, component state, encapsulation, and how to make components reusable.

Objectives:
- Define components
- Determine good values for component state
- Interface with the rest of the world (props)
- Use propTypes as "runnable documentation"
- Handle user interaction


## Props vs. State

One of the first questions that comes up when you start using React is "when do I use state, and when do I use props?" We'll explore an app with changing requirements that lets us experience state moving to props and why. We'll discuss how data flows, or rather, how components communicate with each other. Finally, we'll explore how component composition helps answer the "props vs. state" question.

Objectives:
- Understand the difference between props and state
- Know when to use props vs. state
- Pass data up and down the view hierarchy
- Compose generic components into specialized components


## Forms

Solidify your [declarative](#imperative-to-declarative) understanding by working with forms in React. We'll discuss the various use-cases for forms and how to handle them in React.

Objectives:
- Understand [controlled vs. uncontrolled](https://facebook.github.io/react/docs/forms.html) components
- Work with forms


## Imperative to Declarative

React is "declarative". What does that mean? What is imperative code? We'll answer these questions, and show the power that comes from shifting your imperative code into declarative components using more of the React component lifecycle.

Objectives:
- Turn imperative code into declarative code
- Experience the benefits that come from declarative programming
- Learn to use existing JS libraries declaratively
- Use more of the React component lifecycle
- Understand how and when to use `ref`s


## Testing

Testing UI has never been this straightforward. You'll learn how to test any UI interaction your app has.

Objectives:
- Test stateless components
- Test stateful components
- Simulate events


## Compound Components

Some components get really, really big. Not only do their render methods get large, but as more people try to use the component, the props it takes grow as well. Eventually you end up with way too many properties and a really difficult component to work with that has to change with every new use-case you throw at it. There's a better way with compound components.

Objectives:
- Create reusable components by compounding related components together
- Dynamically flow data between components


## Controlled Compound Components

Some reusable components are a lot like form elements and need to be controlled or uncontrolled. We'll examine techniques to implement components with this kind of behavior.

Objectives:
- Create a component that can be controlled or uncontrolled

Prerequisites:
- [Compound Components](#compound-components)
- [Forms](#forms)


## Context

Context is an advanced, slightly-unstable, and powerful tool that solves a handful of use-cases really elegantly. We'll discuss when and why it's a good solution, and when it's not.

Objectives:
- Learn to use context
- Learn when it's useful and when to use a different pattern

Prerequisites:
- [Compound Components](#compound-components)


## Higher Order Components

Higher order components allow you to compose behavior into components without inheritence or modifying the component itself with a wide range of use-cases.

Objectives:
- Create a higher order component
- Understand when to use a higher order component


## Render Props

As we begin to make more things declarative we run into code that seems unlikely to be made declarative.  We'll explore this pattern and see how it allows us to make anything in our app declarative.

Objectives:
- Learn to use render props
- Learn when they are most useful


## Performance and Render Optimizations

As your app grows you'll eventually hit some slow interactions. We'll explore how to identify the bottlenecks and how to fix them. We'll also see how React can help us avoid the bottlenecks in the first place.

Objectives:
- Identify performance bottlenecks
- Learn how to do "windowing" with React


## Animation

We'll showcase several ways to do animation including imperatively with 3rd-party animation libs like jQuery and declaratively with [react-motion](https://github.com/chenglou/react-motion).

Objectives:
- Animate elements

Prerequisites:
- [Imperative to Declarative](#imperative-to-declarative)
- [Render Props](#render-props)


## Routing

Keep your application UI and the URL in sync, no more broken back buttons. We'll introduce some basic uses of [React Router](https://github.com/ReactTraining/react-router), and how it helps you weave together your components into an application with multiple screens.

Objectives:
- Understand principles of client-side "routing"
- Understand use-cases for routing
- Create UI at specific URLs
- Transition between screens

Prerequisites:
- [Render Props](#render-props)


## Implementing React Router

Use the advanced component patterns to implement React Router yourself.

Objectives:
- Use context to create compount components
- Wrap the imperative `history` API
- Use render props

Prerequisites:
- [Render Props](#render-props)
- [Compound Components](#compound-components)
- [Routing](#routing)


## Server Rendering

React lets you render your components server-side for improved SEO and performance. In this section we'll discuss the techniques and trade-offs of rendering your React components on the server. We'll also transition a fully client-side app to server-side rendering, and discuss the use cases we solve each step of the way.

Objectives:
- Understand principles of server-side rendering and when it's useful
- Render components server-side
- Fetch data before rendering server-side
- Seamlessly transition to the client page without replacing HTML already in the page


## Redux

Redux is a library for managing application state that can be useful when using React. We'll work on a real Redux app that makes requests to a real server and explore some techniques for managing shared state client-side.

Objectives:
- Understand one-way data flow
- Understand Redux concepts like stores and actions
- Implement a feature using Redux
- Handle latency and errors using Redux


## Implementing Redux

The react-redux bindings make use of several advanced features of React including [context](#context) and [higher-order components](#higher-order-components). We'll use both of these concepts to build our own "mini Redux" and discover how Redux really works behind the scenes.

Objectives:
- Use higher-order components to put stuff on context
- Use context to pass state down the hierarchy

Prerequisites:
- [Context](#context)
- [Higher Order Components](#higher-order-components)


## Migrating to React

This section is designed for teams that want to migrate, instead of rewrite, their existing app to React in a way that won't block everyone else on the team. You'll be writing and shipping your new code incrementally. We'll also discuss how to integrate with existing JS libs as you encounter them in your app.

Objectives:
- Learn how to integrate React into an existing code-base
