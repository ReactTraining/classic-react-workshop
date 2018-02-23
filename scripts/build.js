const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

const e = React.createElement;

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
    s = "0" + s;
  }

  return s;
}

function createIndexMarkup(rows) {
  return ReactDOMServer.renderToStaticMarkup(
    e(
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
            "table",
            {
              className: "index-subjectsTable",
              cellSpacing: 0,
              cellPadding: 0
            },
            e("tbody", null, rows)
          )
        )
      )
    )
  );
}

function createSubjectMarkup(bundle) {
  return ReactDOMServer.renderToStaticMarkup(
    e(
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
        e("script", { src: "/__build__/" + bundle + ".js" })
      )
    )
  );
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

const indexRows = [];

subjects.forEach(function(subject, index) {
  const n = leftPad(index, 2);
  const dir = n + " " + subject;

  const cells = [
    e("td", { className: "index-subjectNumber", key: 0 }, n)
  ];

  if (fileExists(path.join(subjectsDir, dir, "lecture.js"))) {
    fs.writeFileSync(
      path.join(subjectsDir, dir, "lecture.html"),
      createSubjectMarkup(dir + "-lecture")
    );

    cells.push(
      e(
        "td",
        { className: "index-lectureCell", key: 1 },
        e("a", { href: "/" + dir + "/lecture.html" }, subject)
      )
    );
  } else {
    cells.push(
      e("td", { className: "index-lectureCell", key: 1 }, subject)
    );
  }

  if (fileExists(path.join(subjectsDir, dir, "exercise.js"))) {
    fs.writeFileSync(
      path.join(subjectsDir, dir, "exercise.html"),
      createSubjectMarkup(dir + "-exercise")
    );

    cells.push(
      e(
        "td",
        { className: "index-exerciseCell", key: 2 },
        e("a", { href: "/" + dir + "/exercise.html" }, "exercise")
      )
    );
  } else {
    cells.push(e("td", { className: "index-exerciseCell", key: 2 }));
  }

  if (fileExists(path.join(subjectsDir, dir, "solution.js"))) {
    fs.writeFileSync(
      path.join(subjectsDir, dir, "solution.html"),
      createSubjectMarkup(dir + "-solution")
    );

    cells.push(
      e(
        "td",
        { className: "index-solutionCell", key: 3 },
        e("a", { href: "/" + dir + "/solution.html" }, "solution")
      )
    );
  } else {
    cells.push(e("td", { className: "index-solutionCell", key: 3 }));
  }

  indexRows.push(e("tr", { key: dir }, cells));
});

fs.writeFileSync(
  path.join(subjectsDir, "index.html"),
  createIndexMarkup(indexRows)
);
