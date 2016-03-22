////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// First, complete the work in `server.js` then come back here.
//
// Render `App` into the `app` element from the server, with the contacts
// the server rendered in the `<script/>`.
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import App from './lib/App'

// TODO: Pass contacts data into the <App> via a prop.
render(<App/>, document.getElementById('app'))
