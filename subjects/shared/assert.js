module.exports = (pass, description) => {
  if (pass === true) {
    console.log('%c✔︎ ok', 'color: green', description);
  }
  else {
    console.assert(pass, description);
  }
};

