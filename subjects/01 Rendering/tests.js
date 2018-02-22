import assert from "../assert";

export function run() {
  const node = document.getElementById("app");
  const html = node.innerHTML;

  assert(!!html.match(/Menu/), "render title");
  assert(!!html.match(/burrito/), "render burrito");
  assert(!!html.match(/tacos/), "render tacos");
  assert(!!html.match(/tostada/), "render tostada");
  assert(!html.match(/mushy peas/), "only show mexican food");
  assert(
    html.indexOf("burrito") < html.indexOf("tacos"),
    "burrito rendered first"
  );
  assert(
    html.indexOf("tacos") < html.indexOf("tostada"),
    "tacos rendered second"
  );
}
