import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class TodoItem extends React.PureComponent {
  state = { done: false };

  //   shouldComponentUpdate(nextProps, nextState) {
  //     return (
  //       nextProps.body !== this.props.body ||
  //       nextState.done !== this.state.done
  //     );
  //   }

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
  <TodoList initialLength={10000} />,
  document.getElementById("app")
);
