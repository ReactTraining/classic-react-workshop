var React = require('react/addons');
var { click } = React.addons.TestUtils.Simulate;
var assert = require('../assert');

function toArray(nodeList) {
  return Array.prototype.slice.call(nodeList, 0);
}

exports.run = (component) => {
  window.location.hash = '';

  var node = React.findDOMNode(component);
  var peopleList = node.querySelector('.people-list');
  var profileLinks = toArray(node.querySelectorAll('.people-list a'));
  var profileHrefFormat = /\/profile\/\d+$/;

  console.log('on first render');

  assert(peopleList, 'render the list of people');
  assert(
    profileLinks.length && profileLinks.every(function (link) {
      return link && profileHrefFormat.test(link.getAttribute('href'));
    }),
    'render links to the profile page'
  );

  console.log('after clicking on a profile link...');

  if (profileLinks.length)
    click(profileLinks[1], { button: 0 });

  assert(
    node.querySelector('.profile'),
    'show the profile page'
  );
};
