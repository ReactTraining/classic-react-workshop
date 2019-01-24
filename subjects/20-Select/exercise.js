////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make this work like a normal <select> box!
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Select extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    readOnly: PropTypes.bool
  };

  static defaultProps = {
    readOnly: false
  };

  state = {
    showOptions: false,
    value: this.props.defaultValue
  };

  toggleOptions = () =>
    this.setState({ showOptions: !this.state.showOptions });

  componentDidMount() {
    if (
      this.isControlled() &&
      !this.props.onChange &&
      !this.props.readOnly
    ) {
      console.warn(
        "This <Select> has a `value` but no `onChange` prop, so it'll be read-only"
      );
    }
  }

  selectValue = value => {
    if (this.isControlled()) {
      this.props.onChange(value);
    } else {
      this.setState({ value });
    }
  };

  isControlled = () => this.props.value != null;

  render() {
    const value = this.isControlled()
      ? this.props.value
      : this.state.value;

    let label;
    React.Children.forEach(this.props.children, child => {
      if (child.props.value === value) {
        label = child.props.children; // the element's text!
      }
    });

    return (
      <div className="select" onClick={this.toggleOptions}>
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
    this.setState({ selectValue: "mint-chutney" });
  };

  handleChange = value => {
    if (value === "hamburger") {
      alert("You are at the wrong restaurant");
    } else {
      this.setState({ selectValue: value });
    }
  };

  render() {
    return (
      <div>
        <h1>Select</h1>

        <h2>Uncontrolled</h2>

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
