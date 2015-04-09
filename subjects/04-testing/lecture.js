var React = require('react/addons');
var assert = require('../shared/assert');

var TestUtils = React.addons.TestUtils;
var Simulate = TestUtils.Simulate;

var ContentToggle = React.createClass({

  propTypes: {
    summary: React.PropTypes.string.isRequired,
    onToggle: React.PropTypes.func
  },

  getInitialState() {
    return {
      isOpen: false
    };
  },

  handleClick() {
    this.setState({
      isOpen: !this.state.isOpen
    }, () => {
      if (this.state.isOpen)
        this.refs.details.getDOMNode().focus();
    });

    if (this.props.onToggle)
      this.props.onToggle();
  },

  render() {
    return (
      <div className="ContentToggle">
        <button onClick={this.handleClick} className="ContentToggle__Summary">
          {this.props.summary}
        </button>
        <div ref="details" tabIndex="-1" className="ContentToggle__Details">
          {this.state.isOpen && this.props.children}
        </div>
      </div>
    );
  }

});

////////////////////////////////////////////////////////////////////////////////
// Render a component to test and assert its content is hidden by default

var component = React.render((
  <ContentToggle summary="i am the summary">
    I am the content
  </ContentToggle>
), document.getElementById('app'));

var button = component.getDOMNode().querySelector('button');
var details = component.getDOMNode().querySelector('.ContentToggle__Details');

assert(details.innerHTML.trim() == '',
  'details are hidden by default');

////////////////////////////////////////////////////////////////////////////////
// Simulate a click on the <button> element and make some assertions

Simulate.click(button);

assert(details.innerHTML.trim() == 'I am the content',
  'details are shown when button is clicked');
assert(document.activeElement === details,
  'The details gets focus when open');

////////////////////////////////////////////////////////////////////////////////
// Simulate a click on the <button> element and make some assertions

Simulate.click(button);

assert(details.innerHTML.trim() == '',
  'details hidden when button is clicked');

////////////////////////////////////////////////////////////////////////////////
// Simulate a click on the <button> element and make some assertions

React.unmountComponentAtNode(document.getElementById('app'));
