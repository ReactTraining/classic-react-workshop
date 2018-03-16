import http from "http";
import React from "react";
import ReactDOMServer from "react-dom/server";

import fetchContacts from "./fetchContacts";
import App from "./App";

const webpackServer = "http://localhost:8080";
const port = 8090;

const createPage = (markup, data) => `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>My Universal App</title>
  </head>
  <body>

    <div id="app">${markup}</div>
    <script>window.__DATA__ = ${JSON.stringify(data)}</script>

    <script src="${webpackServer}/shared.js"></script>
    <script src="${webpackServer}/15-server-rendering/solution.js"></script>
  </body>
</html>
`;

const app = http.createServer((req, res) => {
  fetchContacts((error, contacts) => {
    const markup = ReactDOMServer.renderToString(
      <App contacts={contacts} />
    );
    const html = createPage(markup, { contacts });

    res.writeHead(200, {
      "Content-Type": "text/html",
      "Content-Length": html.length
    });

    res.end(html);
  });
});

app.listen(port, () => {
  console.log("\nOpen http://localhost:%s", port);
});
