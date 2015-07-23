module.exports = function (pass, description) {
  if (pass) {
    console.log('%c✔︎ ok', 'color: green', description);
  } else {
    console.assert(pass, description);
  }
};
