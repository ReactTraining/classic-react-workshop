////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// First, fire up the server:
//
// 1. `cd` into `subjects/19-server-rendering/`
// 2. run `node_modules/.bin/babel-node subjects/19-server-rendering/server.js`
//    from the root of this project
// 3. open http://localhost:5000 (not the typical 8080)
// 4. You will need to restart the server every time you change a file, sorry.
//
// Now let's write some code:
//
// 1. In this file, inside of `createServer`, render `App` with the contacts
//    as a prop, you can use `fetchContacts` to request them. Visit the page
//    to see it render server-side only.
//
// 2. Now that you've got the server working, open up `exercise.js`
////////////////////////////////////////////////////////////////////////////////

var webpackServer = 'http://localhost:8080';
var http = require('http');
var React = require('react');
var App = require('./lib/App');
var fetchContacts = require('./lib/fetchContacts');

function write(res, string) {
  res.writeHead(200, {
    'Content-Length': string.length,
    'Content-Type': 'text/html'
  });
  res.write(string);
  res.end();
}

function createPage(appHTML, data) {
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>My Universal App</title>
    </head>
    <body>

      <div id="app">${appHTML}</div>
      <script>var __DATA__ = ${JSON.stringify(data)};</script>

      <script src=${webpackServer + "/__build__/shared.js"}></script>
      <script src=${webpackServer + "/__build__/19-server-rendering-exercise.js"}></script>
    </body>
  </html>
  `;
}

var app = http.createServer(function(req, res) {
  // fetch data and render `App` here,
  // you'll use `fetchContacts`, `App`, and `createPage`
  write(res, '[fill in with the react app]');
});



app.listen(5000);
console.log('listening on port 5000');

