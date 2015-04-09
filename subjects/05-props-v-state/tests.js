var assert = require('../shared/assert');
var React = require('react/addons');
var { click } = React.addons.TestUtils.Simulate;

exports.run = (component) => {
  var tabs = document.querySelectorAll('.Tab');
  assert(
    component.refs.tabs.state == null,
    'Tabs should not have state'
  );

  click(tabs[1]);
  assert(
    component.getDOMNode().innerHTML.match(/STEP TWO/) != null,
    'clicking changes tabs'
  );

  click(tabs[2]);
  assert(
    component.getDOMNode().innerHTML.match(/STEP THREE/) != null,
    'clicking changes tabs'
  );

  click(tabs[0]);
  assert(
    component.getDOMNode().innerHTML.match(/STEP ONE/) != null,
    'clicking changes tabs'
  );
};


