## Eliminating Time

Solutions are nonsense without understanding the problems they solve. We'll take a trip down memory lane to shine a light on the stuff that led to all the bugs we've written in the past to prime us to see clearly how React is going to help.

Objectives:
- Understand the problems React solves
- Get people thinking about [the conceptual gap between the static program and the dynamic process][Dijkstra], and what it means to "eliminate time" in their apps

[Dijkstra]: https://en.wikiquote.org/wiki/Edsger_W._Dijkstra


## Rendering with React

We'll explore the lowest level of React: rendering UI. We'll take a look at what the "Virtual DOM" and JSX are, brush up on some JavaScript array methods, and do our first coding exercise.

Objectives:
- Render UI with react
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


## Props v. State

One of the first questions that comes up when you start using React is "when do I use state, and when do I use props?" We'll explore an app with changing requirements that lets us experience state moving to props and why. We'll discuss how data flows, or rather, how components communicate with each other. Finally, we'll explore how component composition helps answer the "props v. state" question.

Objectives:
- Understand the difference between props and state
- Know when to use props v. state
- Pass data up and down the view hierarchy
- Compose generic components into specialized components


## The Imperative to Declarative Shift

React is "declarative". What does that mean? What is imperative code?  We'll answer these questions, and show the power that comes from shifting your imperative code into declarative components using more of the React component lifecycle.

Objectives:
- Turn imperative code into declarative code
- Experience the benefits that come from declarative programming
- Learn to use existing JS libraries declaratively
- Use more of the React component lifecycle


## Compound Components

Some components get really, really big. Not only do their render methods get large, but as more people try to use the component, the props it takes grow as well. Eventually you end up with way too many properties and a really difficult component to work with that has to change with every new use-case you throw at it. There's a better way with compound components.

Objectives:
- Create reusable components by compounding related components together
- Dynamically flow data between components


## Context

Context is an advanced, slightly-unstable, and powerful tool that solves a handful of use-cases really elegantly. We'll discuss when and why it's a good solution, and when it's not.

Prerequisites: Compound Components

Objectives:
- Learn to use context
- Learn when it's useful and when to use a different pattern


## Render Props

As we begin to make more things declarative we run into code that seems unlikely to be made declarative.  We'll explore this pattern and see how it allows us to make anything in our app declarative.

Objectives:
- Learn to use render props
- Learn when they are most useful


## Performance and Rendering Optimizations

As your app grows you'll eventually hit some slow interactions. We'll explore how to identify the bottlenecks and how to fix them. We'll also see how React can help us avoid the bottlenecks in the first place.

Objectives:
- Identify performance bottlenecks
- Learn how to do "windowing" with React


## Animation

Name says it all. We'll showcase several ways to do animation declaratively with React.

Objectives:
- Animate elements


## Testing

Testing UI has never been this straightforward. You'll learn how to test any UI interaction your app has.

Objectives:
- Test stateless components
- Test stateful components
- Simulate events


## Higher Order Components

Higher order components allow you to compose behavior into components without inheritence or modifying the component itself with a wide range of use-cases.

Objectives:
- Create a higher order component
- Understand when higher order components are useful
- Know thier limitations


## Forms

Solidify your "declarative" understanding by working with forms in React. We'll discuss the various use-cases for forms and how to handle them in React

Objectives:
- Understand controlled v. uncontrolled components
- Work with forms


## Controlled Compound Components

Prerequisites: [Forms](#forms)

Some reusable components are a lot like form elements and need to be controlled or uncontrolled. We'll examine techniques to implement components with this kind of behavior.

Objectives:
- Create a component that can be controlled or uncontrolled


## Migrating to React

Here we'll discuss a technique to migrate, instead of rewrite, your app to React in way that won't block your team. You'll writing and shipping your new code incrementally. We'll also discuss how to integrate with existing JS libs as you encounter them in your app.

Objectives:
- Learn how to integrate React into an existing code-base


## React Router

Keep your application UI and the URL in sync, no more broken back buttons. We'll introduce some basic uses of React Router, and how it helps you stitch together your components into an application.

Objectives:
- Create UI at specific URLs
- Transition between screens
- Understand basic use-cases for routing


## Redux

Learn how to use the Redux to manage your application state. 

Objectives:
- Create and dispatch actions from user events
- Reflect state updates as props to components
- Update state


## Implementing Redux

With all of your newfound React knowledge, you're going to reimplement Redux from scratch with context and higher order components.

Prerequisites: [Redux](#redux), [Context](#context), [Higher Order Components](#higher-order-components)

Objectives:
- Use context and higher order components
