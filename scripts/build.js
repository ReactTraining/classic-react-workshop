const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

function writeFile(file, contents) {
  mkdirp.sync(path.dirname(file));
  fs.writeFileSync(file, contents);
}

function renderPage(element) {
  return (
    "<!DOCTYPE html>" + ReactDOMServer.renderToStaticMarkup(element)
  );
}

const e = React.createElement;

function HostPage({ bundle, data, title = "React Training" }) {
  return e(
    "html",
    null,
    e(
      "head",
      null,
      e("meta", { charSet: "utf-8" }),
      e("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }),
      e("title", null, title),
      e("link", { rel: "stylesheet", href: "/shared.css" }),
      data &&
        e("script", {
          dangerouslySetInnerHTML: {
            __html: `window.__DATA__ = ${JSON.stringify(data)}`
          }
        })
    ),
    e(
      "body",
      null,
      e("div", { id: "app" }),
      e("script", { src: "/shared.js" }),
      e("script", { src: `/${bundle}.js` })
    )
  );
}

const publicDir = path.resolve(__dirname, "../public");
const subjectsDir = path.resolve(__dirname, "../subjects");
const subjectDirs = fs
  .readdirSync(subjectsDir)
  .map(file => path.join(subjectsDir, file))
  .filter(file => fs.lstatSync(file).isDirectory());

const subjects = [];

subjectDirs.forEach(dir => {
  const split = path.basename(dir).split(/ (.+)/);
  const subject = { number: split[0], name: split[1] };

  const base = path
    .basename(dir)
    .replace(/\s/g, "-")
    .toLowerCase();

  if (fs.existsSync(path.join(dir, "lecture.js"))) {
    console.log(`Building ${base}/lecture.html...`);

    writeFile(
      path.join(publicDir, base, "lecture.html"),
      renderPage(e(HostPage, { bundle: `${base}/lecture` }))
    );

    subject.lecture = `/${base}/lecture.html`;
  }

  if (fs.existsSync(path.join(dir, "exercise.js"))) {
    console.log(`Building ${base}/exercise.html...`);

    writeFile(
      path.join(publicDir, base, "exercise.html"),
      renderPage(e(HostPage, { bundle: `${base}/exercise` }))
    );

    subject.exercise = `/${base}/exercise.html`;
  }

  if (fs.existsSync(path.join(dir, "solution.js"))) {
    console.log(`Building ${base}/solution.html...`);

    writeFile(
      path.join(publicDir, base, "solution.html"),
      renderPage(e(HostPage, { bundle: `${base}/solution` }))
    );

    subject.solution = `/${base}/solution.html`;
  }

  subjects.push(subject);
});

console.log(`Building index.html...`);

writeFile(
  path.join(publicDir, "index.html"),
  renderPage(e(HostPage, { bundle: "index", data: { subjects } }))
);
