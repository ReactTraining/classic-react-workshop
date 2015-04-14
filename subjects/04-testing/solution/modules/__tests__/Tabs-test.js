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

  it('renders the USA tab', function () {
    assert(!!html.match(/USA/), 'USA tab was not rendered');
  });

  it('renders the China tab', function () {
    assert(!!html.match(/China/), 'China tab was not rendered');
  });

  it('renders the Russia tab', function () {
    assert(!!html.match(/Russia/), 'Russia tab was not rendered');
  });

  it('activates the first tab', function () {
    assert(
      tabs[0].style.borderBottomColor === borderFixture.style.borderBottomColor,
      'the first tab should be active'
    );
  });

  it('does not activate the second tab', function () {
    assert(
      tabs[1].style.borderBottomColor !== borderFixture.style.borderBottomColor,
      'the second tab should not be active'
    );
  });

  describe('after clicking the third tab', function () {
    beforeEach(function () {
      click(tabs[2]);
    });

    it('activates the third tab', function () {
      assert(
        tabs[2].style.borderBottomColor === borderFixture.style.borderBottomColor,
        'third tab is active'
      );
    });

    it('deactivates the first tab', function () {
      assert(
        tabs[0].style.borderBottomColor !== borderFixture.style.borderBottomColor,
        'first tab is inactive'
      );
    });

    it('puts the correct content in the panel', function () {
      assert(
        panel.innerHTML.trim() == 'World Cup 2018!',
        'you have the wrong content in the panel'
      );
    });
  });
});
