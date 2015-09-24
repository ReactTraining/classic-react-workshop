var React = require('react/addons');
var { click } = React.addons.TestUtils.Simulate;
var assert = require('../assert');

exports.run = (component) => {
  var node = React.findDOMNode(component);
  var html = node.innerHTML;
  var tabs = node.querySelectorAll('.Tab');
  var panels = node.querySelector('.TabPanels');

  var borderFixture = document.createElement('div');
  borderFixture.setAttribute('style', 'border-bottom-color: #000;');

  console.log('on first render');
  assert(!!html.match(/USA/), 'render USA tab');
  assert(!!html.match(/Brazil/), 'render Brazil tab');
  assert(!!html.match(/Russia/), 'render Russia tab');
  assert(
    tabs[0].style.borderBottomColor === borderFixture.style.borderBottomColor,
    'first tab is active'
  );
  assert(
    tabs[1].style.borderBottomColor !== borderFixture.style.borderBottomColor,
    'second tab is inactive'
  );

  console.log('after clicking the third tab...');
  click(tabs[2]);
  assert(
    tabs[2].style.borderBottomColor === borderFixture.style.borderBottomColor,
    'third tab is active'
  );
  assert(
    tabs[0].style.borderBottomColor !== borderFixture.style.borderBottomColor,
    'first tab is inactive'
  );
  assert(
    panels.textContent.trim() == 'World Cup 2018!',
    'you have the wrong content in the panel'
  );
  click(tabs[0]);
};
