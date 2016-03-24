////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// First, fire up the server:
//
// 1. Run `node_modules/.bin/babel-node subjects/ServerRendering/server.js`
//    from the root of this repository
// 2. Open http://localhost:5000 (not the typical 8080)
// 3. You will need to restart the server every time you change a file, sorry.
//    (or feel free to make `supervisor -- -r 'babel/register' server.js` to work)
//
// Now let's write some code:
//
// 1. Right now we're rendering the entire application client-side. Check
//    out the source of <App>. Our server is essentially sending an empty
//    <body> tag down to the client. Use the "view source" feature in your
//    web browser to see the HTML the server is sending.
// 2. We'd like to render *something* on the server. Use one of react-dom/server's
//    render methods inside the server's request handler (see `server.js`) to
//    inject <App>'s HTML into the #app element before we send the response.
// 3. That's a little better, but we're still just sending a lonely <p> tag
//    down to the client and then fetching the data once we mount. We can do
//    better. Move the data-fetching out of <App>'s componentDidMount and into
//    the request handler on the server (hint: inject the contacts into <App>
//    via a prop instead).
// 4. There's a warning in your browser console! The HTML we're sending from
//    the server doesn't match what React expected on the initial render client-side.
//    To fix this, send the data along with the response in the HTML and pick it
//    up when we render the <App> on the client.
//
// Note: As you go through the steps, try using the "view source" feature of
// your web browser to see the actual HTML you're rendering on the server.
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import App from './App'

// TODO: Pass contacts data into the <App> via a prop.
render(<App/>, document.getElementById('app'))
