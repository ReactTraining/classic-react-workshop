import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import './styles.css'
let { func, any } = PropTypes

////////////////////////////////////////////////////////////////////////////////
// Requirements


class Select extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: this.props.defaultValue || null,
      showChildren: false
    }
    if (!this.isUncontrolled() && !this.props.onChange) {
      console.warn('This thing is gonna be read-only, etc. etc.')
    }
  }

  getLabel () {
    let label = null
    React.Children.forEach(this.props.children, (child) => {
      let childValue = child.props.value
      if (
        (this.isUncontrolled() && childValue === this.state.value) ||
        (child.props.value === this.props.value)
      ) {
        label = child.props.children
      }
    })
    return label
  }

  toggle () {
    this.setState({
      showChildren: !this.state.showChildren
    })
  }

  isUncontrolled () {
    return this.props.value == null
  }

  handleSelect (value) {
    let nextState = { showChildren: false }

    if (this.isUncontrolled())
      nextState.value = value

    this.setState(nextState, () => {
      if (this.props.onChange)
        this.props.onChange(value)
    })
  }

  renderChildren () {
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        onSelect: (value) => this.handleSelect(value)
      })
    })
  }

  render () {
    return (
      <div className="select" onClick={() => this.toggle()}>
        <div className="label">{this.getLabel()} <span className="arrow">▾</span></div>
        {this.state.showChildren && (
          <div className="options">
            {this.renderChildren()}
          </div>
        )}
      </div>
    )
  }
}

Select.propTypes = {
  onChange: func,
  value: any,
  defaultValue: any
};

class Option extends React.Component {
  handleClick () {
    this.props.onSelect(this.props.value)
  }

  render () {
    return (
      <div
        className="option"
        onClick={() => this.handleClick()}
      >{this.props.children}</div>
    )
  }
}

class App extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.state = {
      selectValue: 'dosa'
    };
  }

  render () {
    return (
      <div>
        <h1>Select/Option</h1>

        <pre>{JSON.stringify(this.state, null, 2)}</pre>

        <h2>Controlled</h2>
        <Select
          value={this.state.selectValue}
          onChange={(selectValue) => this.setState({ selectValue })}
        >
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>

        <h2>Uncontrolled</h2>
        <Select defaultValue="tikka-masala">
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));

