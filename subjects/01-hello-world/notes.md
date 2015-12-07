Why React?
==========

Coming from jQuery
------------------

```js
var $input = $('<input/>')
var $results = $('<ul/>')
$input.on('keyup', debounce(function (event) {
  $.getJSON(url, function (data) {
    var html = ''
    data.results.forEach(function (result) {
      var li = $('<li/>')
      var html = '<h2>' +
                    result.title +
                 '  <button data-id="'+result.id+'" class="remove">' +
                 '    remove' +
                 '  </button>' +
                 '</h2>' +
                 '<p>Posted <span class="timeAgo"></span></p>' +
                 '<p>'+result.description+'</p>'
                 '<div class="modal" style="display: none">' +
                 '  Are you sure sure?' +
                 '  <button class="no">No</button> ' +
                 '  <button class="yes">Yes</button>' +
                 '</div>'
      $li.html(html)
      setInterval(function () {
        $li.find('.timeAgo').html(timeAgo(result.posted_at))
      }, 1000)
    })
    $results.html(html)

    $results.find('.remove').on('click', function (event) {
      var $el = $(event.target)
      var $dialog = $el.find('.modal').dialog()

      $el.find('.no').on('click', function () {
        $dialog.dialog('close')
      })

      $el.find('.yes').on('click', function () {
        $.post(deleteUrl+'/'+$el.data('id'))
        $dialog.dialog('close')
        $el.parent().remove()
      })
    })
  })
}), 500)

$('#app').append($input).append($results)
```

- extremely imperative, have to set up every instance of every
  "component"
- `jQuery.fn` is how you would "componentize" things, but they
  aren't composable, can't do a `.dialog` inside of a `.customThing`
  ad-hoc, the `dialog` has to expect the `.customThing`.
- have to manage the state of those instances over time
- knowing when and how to teardown is difficult
- XSS bugs all over the place

Most important questions when looking at code:

- What state is there?
- When does it change?

Coming from Backbone
--------------------

No significant difference from the jQuery version, but the code is
better organized. Still very imperative, teardown is difficult, not
composable, have to piece together the UI manually and careful manage
state over time.

Coming from Angular?
--------------------

Fixes most of the issues, but introduces some new ones.

```html
<div ng-if="foo">foo is being weird, can you find out where?</div>
<div ng-click="remove()">who handles remove?</div>
```

> July 7, 2014
>
> Vojta brought up some points that we don’t yet have plans to solve
> some problems we see in larger apps.  In particular, how developers
> can reason about data flow within an app.
>
> Key points: scope hierarchy is a huge pile of shared state that many
> components from the application because of two way data-binding it's
> not clear what how the data flows because it can flow in all
> directions (including from child components to parents) - this makes
> it hard to understand the app and understand of impact of model
> changes in one part of the app on another (seemingly unrelated) part
> of it.

https://twitter.com/teozaurus/status/518071391959388160

Not only are changes to this kind of state hard to track down, they also
require you think about the state of your app over time instead of just
"right now". You are required to mutate objects, rather than just pass
values to your UI.

- `$scope` exhibits the traits of globals
- Directives are global
- Changes are hard to track down/predict
- Mutation is required

Stocks v. Flows
---------------

`5` v. `5 mph`

- Prefer stocks over flows
- Prefer values over identity and mutation
- Prefer isolation over context
- Prefer composition over ... not ... composition ...
- Optimize for "fixing bugs later", not "building today".

And now ... React
-----------------

React makes the answers obvious to these questions:

- What state is there?
- Where is it changed?

It also allows you to think about your app as a "Stock" instead of a
"Flow"

But first, lets talk about functions, pure functions to be exact:

```js
var add = (x, y) => x + y
```

- will always return the same value given the same input
- has no side-effects

```js
// either as part of the new function's definition
var double = (x) => add(x, x)

// or used to pass in arguments to the function
double(add(x, y), z)

// or even passed INTO a function
var double = (adder, value) => adder(value)
```

Pure functions are incredibly versatile. They are completely isolated
from the context in which they are used.

Okay, now some React:

React components are literally functions that return a
description of UI that will get rendered.

```js
var input = React.DOM.input({type: 'password'})
render(input, document.body)
```

```js
var { div, h1, p } = React.DOM
var element = div({ className: 'App' },
                   h1(null, 'Hello!'),
                   p(null, 'lorem ipsum ...'),
                 )
render(element, document.body)
```

Lets get back to some math. We can create our own types of components in
React:

```js
var Add = React.createClass({
  render () {
    var sum = this.props.x + this.props.y
    return React.DOM.span({}, sum)
  }
})

// don't worry about this rn
Add = React.createFactory(Add)

var element = Add({ x: 2, y: 3 }) // <span>5</span>

var Double = React.createClass({
  render () {
    return Add({
      x: this.props.value,
      y: this.props.value
    })
  }
})

Double = React.createFactory(Double)
var element = Double({ value: 2 }) // <span>4</span>
```

Just functions. Two differences with "normal" functions:

- named `props` instead of `arguments`
- return a description of UI to be rendered later

About that `factory` stuff.

```js
var Foo = React.createClass({ /* ... */})
var element = React.createElement(Foo, props)
// v.
Foo = React.createFactory(Foo)
var element = Foo(props)
```

That only matters if you're not using JSX. We're going to be using JSX.

JSX
---

Now that we know that React components are just functions, perhaps JSX
won't make you puke. XML is a pretty great way to express user interface
components. XML elements have a name, some properties, and hierarchy,
just like UI.

```js
var element = <div className="App">
                <h1 className="Title">Hello!</h1>
                <p>Pork Carnitas street tacos are the best</p>
              </div>

var element = div({ className: "App" },
                h1({ className: "Title" }, 'Hello!'),
                p(null, 'Pork Carnitas street tacos are the best')
              )
```

Again, JSX is really just a different way to call functions. Arrays
start with `[`, regular expressions start with `/`, and UI starts with
`<`. There's nothing crazy going on.

Because its just JavaScript, there are no special ways to deal with
scope, or injection to make components available to your "templates".
This avoids the "globals" problem in Ember, Angular and Web Components,
too.

```js
import SomeThing from './SomeThing'

const App = React.createClass({
  render() {
    var Renamed = Something
    return (
      <div>
        <SomeThing/>
        <Renamed/>
      </div>
    )
  }
})
```

You don't have to rely on and learn the framework's reinvention of the
wheel for stuff like indexes or "filters" and "helpers". Say you want a
bunch of month options that render like this, using a custom option tag
that adds the right class to the option tag for you.

```html
<option class="fancy">March (03)</option>
```

```html
<!-- angular -->
<fancy-option ng-repeat="month in months">
  {{month}} ({{$index | padMonth}})
</fancy-option>
```

Things you have to learn to make this work:

- ng-repeat
- `month in months` DSL
- a wild `$index` appears
- that `|` is called a filter so you can google to learn...
- ... how to create a filter
- how to create a custom directive (got your cheat sheet handy?)
- if anybody else on the team has created a `fancy-option`.

```js
// React
var options = months.map((month, index) => (
  <FancyOption>
    {month} ({ padMonth(index) })
  </FancyOption>
))
```

Things you have to know:

- JavaScript
- `React.createClass`

Always Rerender
---------------

Because React Elements are just descriptions of UI, not the actual UI,
when things change, it can do a diff of the old values with the new
values. If nothing is different, the actual UI isn't touched at all. If
there are changes, the absolute minimal changes to the DOM are
performed. They call this the "Virtual DOM". Its just a bunch of UI
descriptions in memory.

- This allows you to write code that doesn't have to know a whole lot
  about how your app changes over time, all you have to tell it is that
  "something might have changed", it doesn't matter what, and all that
  matters are the values, not the identities of the objects.

- Render is stateless, just like a server app, that's why you can
  actually write a server rendered app in React.

Data Flow & Transactional UI
----------------------------

Instead of sharing data on something like `$scope`, or observable
objects throughout the app, React restricts the data in your components
to two places: State and Props.

Data flows down your UI hierarchy. A parent's state or props flow down
to the props of another component.  There is clear ownership of data and
"contracts" among components when passing it down.

The effect of this data flow is that you can open up the file for a
component and know everything about it, no guessing or hunting to find
out how something got into your UI. Mix that with "always rerender" and
you've got a view layer that is refreshingly simple to understand.

While two-way binding and automatic UI updates are useful sometimes,
most of the time your UI is transactional. You don't really want the
text on your page changing when you're filling out a form, and you want
to be able to decide precisely when to update the UI. React doesn't
rerender until you tell it you're ready.

Let's dig in.


