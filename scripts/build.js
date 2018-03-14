const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

const e = React.createElement;

function IndexPage({ data }) {
  return e(
    "html",
    null,
    e(
      "head",
      null,
      e("link", { rel: "stylesheet", href: "/shared.css" })
    ),
    e(
      "body",
      null,
      e(
        "div",
        { className: "index" },
        e(
          "div",
          { className: "index-logo" },
          e("img", { src: "/logo.png" })
        ),
        e(
          "table",
          {
            className: "index-subjectsTable",
            cellSpacing: 0,
            cellPadding: 0
          },
          e(
            "tbody",
            null,
            data.map((row, index) =>
              e(
                "tr",
                { key: index },
                row.map((content, index) =>
                  e("td", { key: index }, content)
                )
              )
            )
          )
        )
      )
    )
  );
}

function SubjectPage({ bundle }) {
  return e(
    "html",
    null,
    e(
      "head",
      null,
      e("link", { rel: "stylesheet", href: "/shared.css" })
    ),
    e(
      "body",
      null,
      e("div", { id: "app" }),
      e("script", { src: "/__build__/shared.js" }),
      e("script", { src: `/__build__/${bundle}.js` })
    )
  );
}

function fileExists(file) {
  try {
    const stats = fs.statSync(file);
    return true;
  } catch (error) {
    return false;
  }
}

function leftPad(s, length) {
  s = "" + s;

  while (s.length < length) {
    s = `0${s}`;
  }

  return s;
}

const rootDir = path.resolve(__dirname, "..");
const subjectsDir = path.join(rootDir, "subjects");

const subjects = [
  "Hello World",
  "Rendering",
  "Components",
  "Props and State",
  "Forms",
  "Testing",
  "Imperative to Declarative",
  "Compound Components",
  "Context",
  "Higher-order Components",
  "Render Props",
  "Routing",
  "Animation",
  "Transitions",
  "Render Optimizations",
  "Server Rendering",
  "Redux",
  "Immutability",
  "Migrating to React",
  "Chat App"
];

const exercises = [
  "JSON Table",
  "Mini Redux",
  "Mini Router",
  "Select",
  "Slider"
];

const rows = [];

subjects.forEach((subject, index) => {
  const n = leftPad(index, 2);
  const dir = `${n} ${subject}`;

  const row = [n];

  if (fileExists(path.join(subjectsDir, dir, "lecture.js"))) {
    console.log(`Building subjects/${dir}/lecture.html...`);

    fs.writeFileSync(
      path.join(subjectsDir, dir, "lecture.html"),
      ReactDOMServer.renderToStaticMarkup(
        e(SubjectPage, { bundle: `${dir}-lecture` })
      )
    );

    row.push(e("a", { href: `/${dir}/lecture.html` }, subject));
  } else {
    row.push(subject);
  }

  if (fileExists(path.join(subjectsDir, dir, "exercise.js"))) {
    console.log(`Building subjects/${dir}/exercise.html...`);

    fs.writeFileSync(
      path.join(subjectsDir, dir, "exercise.html"),
      ReactDOMServer.renderToStaticMarkup(
        e(SubjectPage, { bundle: `${dir}-exercise` })
      )
    );

    row.push(e("a", { href: `/${dir}/exercise.html` }, "exercise"));
  } else {
    row.push(null);
  }

  if (fileExists(path.join(subjectsDir, dir, "solution.js"))) {
    console.log(`Building subjects/${dir}/solution.html...`);

    fs.writeFileSync(
      path.join(subjectsDir, dir, "solution.html"),
      ReactDOMServer.renderToStaticMarkup(
        e(SubjectPage, { bundle: `${dir}-solution` })
      )
    );

    row.push(e("a", { href: `/${dir}/solution.html` }, "solution"));
  } else {
    row.push(null);
  }

  rows.push(row);
});

console.log(`Building subjects/index.html...`);

fs.writeFileSync(
  path.join(subjectsDir, "index.html"),
  ReactDOMServer.renderToStaticMarkup(e(IndexPage, { data: rows }))
);
