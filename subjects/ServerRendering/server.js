/*eslint-disable no-console, prefer-template, prefer-arrow-callback */
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
  // TODO: We'd like to render the <App> on the server
  // instead of just sending a practically empty page.
  write(res, createPage())
})

app.listen(5000, function () {
  console.log('Server listening on port %s', 5000)
})
