////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// 1. Implement <Provider> to make the store accessible on context to the rest
//    of the components rendered below it
// 2. Implement `connect`: it should:
//   a) Return a function that takes a component
//   b) The new function should return a new component that wraps the component
//      passed to it
//   c) The new component, when rendered, will pass state from
//      the store as props to your App component. You'll use the function
//      passed to `connect` to map store state to component props

import React from 'react'
import { render } from 'react-dom'
import createStore from './mini-redux/createStore'
import Provider from './mini-redux/Provider'
import App from './components/App'

const store = createStore((state = 0, action) => {
  if (action.type === 'INCREMENT') {
    return state + 1
  } else if (action.type === 'DECREMENT') {
    return state - 1
  } else {
    return state
  }
})

render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('app'))
