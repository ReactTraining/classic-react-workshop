////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { createHashHistory } from 'history'

class Router extends React.Component {

  static childContextTypes = {
    location: React.PropTypes.object,
    history: React.PropTypes.object
  }

  getChildContext() {
    return {
      location: this.state.location,
      history: this.history
    }
  }

  history = createHashHistory()

  state = {
    location: this.history.location
  }

  componentDidMount() {
    this.history.listen(() => {
      this.setState({
        location: this.history.location
      })
    })
  }

  render() {
    return this.props.children
  }
}

class Route extends React.Component {
  static contextTypes = {
    location: React.PropTypes.object
  }

  render() {
    const { location } = this.context
    const { path, render, component:Component } = this.props
    const isMatch = location.pathname.startsWith(path)

    if (isMatch) {
      if (render) {
        return render()
      } else if (Component) {
        return <Component/>
      } else {
        return null
      }
    } else {
      return null
    }
  }
}

class Link extends React.Component {
  static contextTypes = {
    history: React.PropTypes.object
  }

  handleClick = (e) => {
    e.preventDefault()
    this.context.history.push(this.props.to)
  }

  render() {
    return (
      <a
        href={`#${this.props.to}`}
        onClick={this.handleClick}
      >
        {this.props.children}
      </a>
    )
  }
}

export { Router, Route, Link }
