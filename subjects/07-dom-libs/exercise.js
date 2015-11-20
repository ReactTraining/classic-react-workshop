////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// http://getbootstrap.com/javascript/#dropdowns
//
// Wrap Bootstrap Dropdown in a React component and just rely on the declarative
//
// Got extra time?
//
// Allow the parent to manage the state of the dropdown
// - set up an `isShowing` prop
// - when the component mounts, decide to show or hide the dropdown based on the
//   `isShowing` prop
// - when the component updates, decide to show or hide the dropdown based on
//   the `isShowing` prop
// - synchronize the state back to the parent when the popup closes with an
//   `onHide` prop
//
// http://getbootstrap.com/javascript/#dropdowns
////////////////////////////////////////////////////////////////////////////////
var React = require('react');
var $ = require('jquery');
require('bootstrap-webpack');

var Dropdown = React.createClass({
  render () {
    return (
      <div>

      </div>
    );
  }
});

var DropdownItem = React.createClass({
  render () {
    return (
      <li>

      </li>
    );
  }
});



var App = React.createClass({
  render () {
    return (
      <div className="container">
        <h1>Dropdown</h1>
        <ul className="nav nav-pills">
          <li>
            <div className="dropdown">
              <button className="btn btn-default" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown trigger
                <span className="caret"></span>
              </button>
              <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
                <li><a href="#" onClick={() => alert('clicked!')}>one</a></li>
                <li><a href="#">two</a></li>
                <li><a href="#">three</a></li>
              </ul>
            </div>

            {/* this would be nicer */}
            <Dropdown label="Dropdown Trigger">
              <DropdownItem onClick={() => alert('clicked')}>one</DropdownItem>
              <DropdownItem>two</DropdownItem>
              <DropdownItem>three</DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));

