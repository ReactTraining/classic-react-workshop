/*
<Router>

1. add some state w/ `location` as a key
2. set `location`'s initial value to `this.history.location`
3. listen to `history` and put the location into state
4. Provide `location` on context
5. Provide `history` on context

<Route>

1. Get the location from context
2. Figure out if the path matches location.pathname
   (hint: location.pathname.startsWith(...)
3. If there is a match, figure out which prop to render
   `component` or `render`
4. If there is no match, render null

<Link>

1. get `history` from context
2. use `history.push(...)` with the `to` prop

*/
import './exercise/index'
