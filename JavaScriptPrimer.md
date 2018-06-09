We're excited to have you attend one of our workshops! Here's a JavaScript (re)fresher to help you get up-to-speed on some of the newer features of the language we'll be using throughout the workshop to help you get the most out of it.

Note: All of the syntax discussed here is actually part of the JavaScript spec, though you may not have seen it yet. See the [Babel](https://babeljs.io/docs/learn-es2015/) project for more info.

## Let and Const

JavaScript has always had `var`:

```js
var name = "Michael";
```

`var` can be hard to manage especially because of it's "function scoping", so now we've got two other ways to define values that have "block scope":

```js
// var does not have block scope
var name = "Michael";
if (true) {
  var name = "Bruce";
  name; // 'Bruce'
}
name; // 'Bruce'

// let has block scope
let name = "Michael";
if (true) {
  let name = "Bruce";
  name; // 'Bruce'
}
name; // 'Michael'

// const has block scope too
const name = "Michael";
if (true) {
  const name = "Bruce";
  name; // 'Bruce'
}
name; // 'Michael'

// let can be reassigned
let isOpen = true;
isOpen = false;
isOpen; // false

// const cannot be reassigned
const isOpen = true;
isOpen = false; // throws error
```

We find block scope to make more sense to people and is generally more useful, therefore we don't use `var`.

We use `const` for everything, unless it can be reassigned later, only then do we use `let`. It's a way to let other people know (pun intended) to watch out for that value, because it will likely change over time.

In practice, nearly everything is `const`.

## String templates

```js
const something = "ugly stuff";
const str = "instead of " + something + " like this";

const something = "lovely stuff";
const str = `you can do ${something} like this`;

const str = `
  also
  multiline
  is totally cool
`;
```

## Concise object methods

You can drop off `: function` from object method definitions.

```js
const obj = {
  insteadOfThis: function() {
    // do stuff
  },

  youCanDoThis() {
    // do stuff
  }
};
```

## Arrow functions

Arrow functions remove the context from a function, meaning the function has no `this`. If you reference `this` inside an arrow function, you get the `this` from outside the function. It also looks great.

```js
const obj = {
  url: "/api/stuff",

  fetch(users) {
    users.forEach(user => {
      // `this` is the `this` from outside this function because
      // there is no context inside an arrow function
      getUser(`${this.url}/${user.id}`);
    });
  }
};
```

Also, if the other side of an arrow function is an expression, it acts like an implicit return:

```js
const add = function(x, y) {
  return x + y;
};

// becomes
const add = (x, y) => {
  return x + y;
};

// which can be shorter with explicit expression return
const add = (x, y) => x + y;
```

## Arrays

We do a lot with arrays, here are a few methods we use often:

```js
const numbers = [1, 2, 3, 4, 5];

// map converts an array to a new, transformed array
const doubled = numbers.map(number => {
  return number * 2;
});
doubled; // [ 2, 4, 6, 8, 10 ]

// filter, return false to remove from an array
const lessThan3 = numbers.filter(n => {
  return n < 3;
});
lessThan3; // [ 1, 2 ]

// remember, that can be super short
const lessThan3 = numbers.filter(n => n < 3);
```

## Destructuring

```js
const obj = { x: 1, y: 2 };

// instead of:
const x = obj.x;
const y = obj.y;

// we can "destructure" the values off
const { x, y } = obj;
x; // 1
y; // 2

// you can use this all over the place, like function parameters
function add({ x, y }) {
  return x + y;
}
add({ x: 3, y: 4 }); // 7
```

## Modules

```js
// instead of cjs
var React = require("react");

// we use ES modules
import React from "react";
import ReactDOM from "react-dom";

// and with destructuring to boot!
import { render } from "react-dom";
```

Our training material then uses [Webpack](https://webpack.github.io/), a module bundler, to graph the dependencies and create a build so that this works in browsers that don't yet support some of these features natively.
