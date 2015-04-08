var assert = require('../shared/assert');

exports.run = () => {
  var html = document.getElementById('app').innerHTML;
  assert(!!html.match(/burrito/), 'render burrito');
  assert(!!html.match(/tacos/), 'render tacos');
  assert(!!html.match(/tostada/), 'render tostada');
  assert(!html.match(/hush puppies/), 'filter out hush puppies');
  assert(html.indexOf('burrito') < html.indexOf('tacos'), 'burrito rendered first');
  assert(html.indexOf('tacos') < html.indexOf('tostada'), 'tacos rendered second');
};

