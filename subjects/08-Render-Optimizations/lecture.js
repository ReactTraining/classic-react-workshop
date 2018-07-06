import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class TodoItem extends React.Component {
  state = {
    done: false
  };

  render() {
    return (
      <li>
        <label>
          <input
            type="checkbox"
            onChange={event =>
              this.setState({ done: event.target.checked })
            }
          />{" "}
          <strong>
            <span style={{ textTransform: "uppercase" }}>todo:</span>{" "}
          </strong>
          <span
            style={{
              color: "blue",
              textDecoration: this.state.done ? "line-through" : "none"
            }}
          >
            {this.props.body}
          </span>
        </label>
      </li>
    );
  }
}

class TodoList extends React.Component {
  static propTypes = {
    initialLength: PropTypes.number.isRequired
  };

  state = {
    items: Array.from(new Array(this.props.initialLength)).map(
      (_, index) => ({
        id: index,
        body: `item ${index + 1}`
      })
    )
  };

  handleSubmit = event => {
    event.preventDefault();

    const item = {
      id: this.state.items.length,
      body: event.target.elements[0].value
    };

    event.target.reset();

    this.setState({
      items: [item].concat(this.state.items)
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input ref="input" />
        </form>
        <ul>
          {this.state.items.map(item => (
            <TodoItem key={item.id} body={item.body} />
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <TodoList initialLength={100} />,
  document.getElementById("app")
);

///////////////////////////////////////////////////////////////////////////////
// Rendering large lists can be super slow. This is an old UI problem.

///////////////////////////////////////////////////////////////////////////////
// One possible solution is to only render the stuff that's actually in the
// view. Native mobile frameworks have been doing this for years:
//
// https://developer.apple.com/library/ios/documentation/UIKit/Reference/UITableView_Class/index.html

///////////////////////////////////////////////////////////////////////////////
// I'd really like to do this in my web app! What does it look like when we
// try to do this with imperative JavaScript?
//
// https://github.com/airbnb/infinity
// https://github.com/emberjs/list-view
