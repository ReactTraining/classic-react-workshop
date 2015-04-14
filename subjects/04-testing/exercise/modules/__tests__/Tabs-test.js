var assert = require('assert');
var React = require('react/addons');
var { click } = React.addons.TestUtils.Simulate;
var Tabs = require('../Tabs');

describe('when <Tabs> is rendered', function () {

  var fixtureData = [
    { name: 'USA', description: 'Land of the Free, Home of the brave' },
    { name: 'China', description: 'Lots of concrete' },
    { name: 'Russia', description: 'World Cup 2018!' },
  ];

  var node, html, tabs, panel, borderFixture;
  beforeEach(function (done) {
    var component = React.render(<Tabs data={fixtureData}/>, document.body, function () {
      node = React.findDOMNode(this);
      html = node.innerHTML;
      tabs = node.querySelectorAll('.Tab');
      panel = node.querySelector('.TabPanel');

      borderFixture = document.createElement('div');
      borderFixture.setAttribute('style', 'border-bottom-color: #000;');

      done();
    });
  });

  afterEach(function () {
    React.unmountComponentAtNode(document.body);
  });

  it('renders the USA tab');

  it('renders the China tab');

  it('renders the Russia tab');

  it('activates the first tab');

  it('does not activate the second tab');

  describe('after clicking the third tab', function () {
    beforeEach(function () {
      // TODO
    });

    it('activates the third tab');

    it('deactivates the first tab');

    it('puts the correct content in the panel');
  });
});
