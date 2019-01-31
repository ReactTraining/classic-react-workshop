////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make this work like a normal <select> box!
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const SelectContext = React.createContext();

class Select extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    defaultValue: PropTypes.any
  };

  state = { showOptions: false, value: this.props.defaultValue };

  selectValue = value => {
    if (this.isControlled()) {
      this.props.onChange(value);
    } else {
      // If we're not controlled, go ahead and setState.
      this.setState({ value });
    }
  };

  toggleOptions = () => {
    this.setState({ showOptions: !this.state.showOptions });
  };

  isControlled() {
    // If we have a `value` prop, we are controlled!
    return this.props.value != null;
  }

  handleMutation = event => {
    if (event[0].attributeName === "value") {
      const newValue = this.node.getAttribute("value");
      this.selectValue(newValue);
    }
    // debugger;
  };

  componentDidMount() {
    if (this.isControlled() && !this.props.onChange) {
      console.warn(
        "You provided a `value` prop w/out an `onChange` prop. This <Select> is gonna be read-only..."
      );
    }

    this.observer = new MutationObserver(this.handleMutation);
    this.observer.observe(this.node, {
      attributes: true
    });
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  render() {
    const value = this.isControlled()
      ? this.props.value
      : this.state.value;

    let label;
    React.Children.forEach(this.props.children, child => {
      if (child.props.value === value) {
        label = child.props.children;
      }
    });

    return (
      <div
        className="select"
        onClick={this.toggleOptions}
        ref={node => (this.node = node)}
      >
        <div className="label">
          {label} <span className="arrow">▾</span>
        </div>
        {this.state.showOptions && (
          <div className="options">
            {React.Children.map(this.props.children, child =>
              React.cloneElement(child, {
                _onSelect: () => this.selectValue(child.props.value)
              })
            )}
          </div>
        )}
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return (
      <div className="option" onClick={this.props._onSelect}>
        {this.props.children}
      </div>
    );
  }
}

class App extends React.Component {
  state = { selectValue: "dosa" };

  setToMintChutney = () => {
    // this.setState({ selectValue: "mint-chutney" });
    const node = document.querySelectorAll(".select")[1];
    node.setAttribute("value", "mint-chutney");
  };

  handleChange = value => {
    if (value === "hamburger") {
      alert(
        "You are at the wrong restaurant! we do NOT serve hamburgers"
      );
    } else {
      this.setState({ selectValue: value });
    }
  };

  render() {
    return (
      <div>
        <h1>Select</h1>

        <h2>Uncontrolled</h2>

        {/* has its own internal state */}
        <Select defaultValue="tikka-masala">
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
          <Option value="hamburger">Hamburger</Option>
        </Select>

        <h2>Controlled</h2>

        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <p>
          <button onClick={this.setToMintChutney}>
            Set to Mint Chutney
          </button>
        </p>

        {/* state is kept in the parent (the <App>) */}
        <Select
          value={this.state.selectValue}
          onChange={this.handleChange}
        >
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>

          <Option value="hamburger">Hamburger</Option>
        </Select>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
