function assert(pass, description) {
  if (pass) {
    console.log("%c✔︎ ok", "color: green", description);
  } else {
    console.assert(pass, description);
  }
}

export default assert;
