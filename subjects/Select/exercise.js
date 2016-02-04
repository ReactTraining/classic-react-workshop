import React, { PropTypes } from 'react';
import { render } from 'react-dom'
import './styles.css'
let { func, any } = PropTypes

////////////////////////////////////////////////////////////////////////////////
// Requirements
//
// Make this work like a normal <select><option/></select>

class Select extends React.Component {
  render () {
    return (
      <div/>
    )
  }
}

Select.propTypes = {
  onChange: func,
  value: any,
  defaultValue: any
};

class Option extends React.Component {
  render () {
    return (
      <div/>
    )
  }
}

class App extends React.Component {
  constructor (props) {

    super(props);
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
