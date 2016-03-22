/*eslint-disable no-console */
////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// First, fire up the server:
//
// 1. run `node_modules/.bin/babel-node subjects/ServerRendering/server.js`
//    from the root of this repository
// 2. open http://localhost:5000 (not the typical 8080)
// 3. You will need to restart the server every time you change a file, sorry.
//    (or feel free to make `supervisor -- -r 'babel/register' server.js` to work)
//
// Now let's write some code:
//
// 1. Right now we're rendering the entire application client-side. Check
//    out the source of <App>. Our server is essentially sending an empty
//    <body> tag down to the client.
// 2. We'd like to render *something* on the server. Use one of react-dom/server's
//    render methods to render some HTML before we send the response. We'll
//    need to inject the HTML into the #app element in createPage.
// 3. That's a little better, but we're still just sending a lonely <p> tag
//    down to the client and then fetching the data once we mount. We can do better.
// 4. Move the data-fetching into the request handler on the server and inject
//    it into <App> via a prop. This requires us to pass some data to the client
//    somehow in exercise.js.
////////////////////////////////////////////////////////////////////////////////
import http from 'http'
import React from 'react'

const webpackServer = 'http://localhost:8080'

function write(res, string) {
  res.writeHead(200, {
    'Content-Length': string.length,
    'Content-Type': 'text/html'
  })
  res.write(string)
  res.end()
}

function createPage() {
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <title>My Universal App</title>
    </head>
    <body>

      <div id="app"></div>

      <script src=${webpackServer + '/__build__/shared.js'}></script>
      <script src=${webpackServer + '/__build__/ServerRendering-exercise.js'}></script>
    </body>
  </html>
  `
}

const app = http.createServer(function (req, res) {
  write(res, createPage())
})

app.listen(5000)
console.log('listening on port 5000')
