var React = require('react/addons');
var { click } = React.addons.TestUtils.Simulate;
var assert = require('../assert');

exports.run = (component) => {
  var node = React.findDOMNode(component);
  var tabs = node.querySelectorAll('.Tab');

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
