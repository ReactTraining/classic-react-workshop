const div = document.createElement("div");
div.setAttribute("id", "mocha");
document.body.appendChild(div);
import "mocha/mocha.css";
const mocha = require("imports?global=>window!./mocha-browser");
window.mocha.setup("bdd");
setTimeout(() => window.mocha.run(), 0);
