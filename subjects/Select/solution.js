/*eslint-disable no-console */
////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make this work like a normal <select> box!
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './styles.css'

class Select extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    defaultValue: PropTypes.any
  }

  state = {
    value: this.props.defaultValue || null,
    showChildren: false
  }

  componentWillMount() {
    if (!this.isUncontrolled() && !this.props.onChange)
      console.warn('This thing is gonna be read-only, etc. etc.')
  }

  getLabel() {
    let label = null

    React.Children.forEach(this.props.children, (child) => {
      const childValue = child.props.value

      if (
        (this.isUncontrolled() && childValue === this.state.value) ||
        (child.props.value === this.props.value)
      ) {
        label = child.props.children
      }
    })

    return label
  }

  toggle() {
    this.setState({
      showChildren: !this.state.showChildren
    })
  }

  isUncontrolled() {
    return this.props.value == null
  }

  handleSelect(value) {
    const nextState = { showChildren: false }

    if (this.isUncontrolled())
      nextState.value = value

    this.setState(nextState, () => {
      if (this.props.onChange)
        this.props.onChange(value)
    })
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) => (
      React.cloneElement(child, {
        onSelect: (value) => this.handleSelect(value)
      })
    ))
  }

  render() {
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

class Option extends React.Component {
  handleClick() {
    this.props.onSelect(this.props.value)
  }

  render() {
    return (
      <div
        className="option"
        onClick={() => this.handleClick()}
      >{this.props.children}</div>
    )
  }
}

class App extends React.Component {
  state = {
    selectValue: 'dosa'
  }

  setToMintChutney = () => {
    this.setState({ selectValue: 'mint-chutney' })
  }

  render() {
    return (
      <div>
        <h1>Select/Option</h1>

        <pre>{JSON.stringify(this.state, null, 2)}</pre>

        <h2>Controlled</h2>
        <p>
          <button onClick={this.setToMintChutney}>Set to Mint Chutney</button>
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

        <h2>Uncontrolled</h2>
        <Select defaultValue="tikka-masala">
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
