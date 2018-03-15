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
          e(
            "a",
            { href: "https://reacttraining.com" },
            e("img", { src: "/logo.png" })
          )
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

function renderPage(page, props) {
  return (
    "<!doctype html>" +
    ReactDOMServer.renderToStaticMarkup(e(page, props))
  );
}

const publicDir = path.resolve(__dirname, "../public");
const subjectsDir = path.resolve(__dirname, "../subjects");
const subjectDirs = fs
  .readdirSync(subjectsDir)
  .map(file => path.join(subjectsDir, file))
  .filter(file => fs.lstatSync(file).isDirectory());

const rows = [];

subjectDirs.forEach(dir => {
  const split = path.basename(dir).split(/ (.+)/);
  const n = split[0];
  const subject = split[1];

  const row = [n];

  const base = path
    .basename(dir)
    .replace(/\s/g, "-")
    .toLowerCase();

  if (fs.existsSync(path.join(dir, "lecture.js"))) {
    console.log(`Building ${base}-lecture.html...`);

    fs.writeFileSync(
      path.join(publicDir, `${base}-lecture.html`),
      renderPage(SubjectPage, { bundle: `${base}-lecture` })
    );

    row.push(e("a", { href: `/${base}-lecture.html` }, subject));
  } else {
    row.push(subject);
  }

  if (fs.existsSync(path.join(dir, "exercise.js"))) {
    console.log(`Building ${base}-exercise.html...`);

    fs.writeFileSync(
      path.join(publicDir, `${base}-exercise.html`),
      renderPage(SubjectPage, { bundle: `${base}-exercise` })
    );

    row.push(e("a", { href: `/${base}-exercise.html` }, "exercise"));
  } else {
    row.push(null);
  }

  if (fs.existsSync(path.join(dir, "solution.js"))) {
    console.log(`Building ${base}-solution.html...`);

    fs.writeFileSync(
      path.join(publicDir, `${base}-solution.html`),
      renderPage(SubjectPage, { bundle: `${base}-solution` })
    );

    row.push(e("a", { href: `/${base}-solution.html` }, "solution"));
  } else {
    row.push(null);
  }

  rows.push(row);
});

console.log(`Building index.html...`);

fs.writeFileSync(
  path.join(publicDir, "index.html"),
  renderPage(IndexPage, { data: rows })
);
