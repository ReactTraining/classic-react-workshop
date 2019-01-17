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

  toggleOptions = () =>
    this.setState({ showOptions: !this.state.showOptions });

  hideOptions = () => this.setState({ showOptions: false });

  handleChange = value => {
    if (this.isControlled()) {
      this.props.onChange(value);
    } else {
      this.setState({ value });
    }
  };

  isControlled = () => this.props.value != null;

  render() {
    const currentValue = this.isControlled()
      ? this.props.value
      : this.state.value;

    let label = null;
    React.Children.forEach(this.props.children, child => {
      if (child.props.value === currentValue) {
        label = child.props.children;
      }
    });

    return (
      <div
        className="select"
        onClick={this.toggleOptions}
        onBlur={this.hideOptions}
        tabIndex="-1"
      >
        <div className="label">
          {label} <span className="arrow">▾</span>
        </div>
        <SelectContext.Provider value={{ change: this.handleChange }}>
          {this.state.showOptions && (
            <div className="options">{this.props.children}</div>
          )}
        </SelectContext.Provider>
      </div>
    );
  }
}

class Option extends React.Component {
  static contextType = SelectContext;

  handleClick = () => {
    this.context.change(this.props.value);
  };

  render() {
    return (
      <div className="option" onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    selectValue: "dosa"
  };

  setToMintChutney = () => {
    this.setState({ selectValue: "mint-chutney" });
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
          onChange={value => this.setState({ selectValue: value })}
        >
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
