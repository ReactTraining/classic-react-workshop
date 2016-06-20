import React from 'react'
import { render } from 'react-dom'
import * as styles from './styles'

////////////////////////////////////////////////////////////////////////////////
// Sometimes you don't want to specify how deep in the view tree the child
// components need to be, our current implementation expects TabList/TabPanels
// to be immediate children of Tabs, also Tab and TabPanel are required to be
// immediate children of their parent components. We really only care about the
// interactivity between the components, not their hierarchy.
//
// We could recursively check children with each render, which seems like a bad
// plan, so instead we can use a feature called "context".

const TabList = React.createClass({
  render() {
    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        isActive: index === this.props.activeIndex,
        onClick: () => this.props.onActivate(index)
      })
    })
    return <div style={styles.tabs}>{children}</div>
  }
})

const Tab = React.createClass({
  render() {
    return (
      <div
        onClick={this.props.disabled ? null : this.props.onClick}
        style={this.props.disabled ? styles.disabledTab : (
          this.props.isActive ? styles.activeTab : styles.tab
        )}
      >
        {this.props.children}
      </div>
    )
  }
})

const TabPanels = React.createClass({
  render() {
    return (
      <div style={styles.tabPanels}>
        {this.props.children[this.props.activeIndex]}
      </div>
    )
  }
})

const TabPanel = React.createClass({
  render() {
    return <div>{this.props.children}</div>
  }
})

const Tabs = React.createClass({
  getInitialState() {
    return {
      activeIndex: 0
    }
  },

  render() {
    const children = React.Children.map(this.props.children, (child, index) => {
      if (child.type === TabPanels) {
        return React.cloneElement(child, {
          activeIndex: this.state.activeIndex
        })
      }
      else if (child.type === TabList) {
        return React.cloneElement(child, {
          activeIndex: this.state.activeIndex,
          onActivate: (activeIndex) => this.setState({ activeIndex })
        })
      }
      else {
        return child
      }
    })

    return <div>{children}</div>
  }
})

const App = React.createClass({
  render () {
    return (
      <div>
        <Tabs>
          <TabList>
            <Tab>Tacos</Tab>
            <Tab disabled>Burritos</Tab>
            <Tab>Coconut Korma</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>Tacos are delicious</p>
            </TabPanel>
            <TabPanel>
              <p>Sometimes a burrito is what you really need.</p>
            </TabPanel>
            <TabPanel>
              <p>Might be your best option.</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    )
  }
})

render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Wrapping TabPanels in a div breaks everything, lets introduce context

//const TabList = React.createClass({
//  render () {
//    const children = React.Children.map(this.props.children, (child, index) => {
//      return React.cloneElement(child, {
//        isActive: index === this.props.activeIndex,
//        onClick: () => this.props.onActivate(index)
//      })
//    })
//    return <div style={styles.tabs}>{children}</div>
//  }
//})
//
//const Tab = React.createClass({
//  render () {
//    return (
//      <div
//        onClick={this.props.disabled ? null : this.props.onClick}
//        style={this.props.disabled ? styles.disabledTab : (
//          this.props.isActive ? styles.activeTab : styles.tab
//        )}
//      >
//        {this.props.children}
//      </div>
//    )
//  }
//})
//
//const TabPanels = React.createClass({
//  contextTypes: {
//    activeIndex: React.PropTypes.number
//  },
//
//  render () {
//    return (
//      <div style={styles.tabPanels}>
//        {this.props.children[this.context.activeIndex]}
//      </div>
//    )
//  }
//})
//
//const TabPanel = React.createClass({
//  render () {
//    return <div>{this.props.children}</div>
//  }
//})
//
//const Tabs = React.createClass({
//  getInitialState() {
//    return {
//      activeIndex: 0
//    }
//  },
//
//  childContextTypes: {
//    activeIndex: React.PropTypes.number
//  },
//
//  getChildContext () {
//    return {
//      activeIndex: this.state.activeIndex
//    }
//  },
//
//  render() {
//    const children = React.Children.map(this.props.children, (child, index) => {
//      if (child.type === TabList) {
//        return React.cloneElement(child, {
//          activeIndex: this.state.activeIndex,
//          onActivate: (activeIndex) => this.setState({ activeIndex })
//        })
//      }
//      else {
//        return child
//      }
//    })
//
//    return <div>{children}</div>
//  }
//})
//
//const App = React.createClass({
//  render () {
//    return (
//      <div>
//        <Tabs>
//          <TabList>
//            <Tab>Tacos</Tab>
//            <Tab disabled>Burritos</Tab>
//            <Tab>Coconut Korma</Tab>
//          </TabList>
//
//          <div>
//            <TabPanels>
//              <TabPanel>
//                <p>Tacos are delicious</p>
//              </TabPanel>
//              <TabPanel>
//                <p>Sometimes a burrito is what you really need.</p>
//              </TabPanel>
//              <TabPanel>
//                <p>Might be your best option.</p>
//              </TabPanel>
//            </TabPanels>
//          </div>
//        </Tabs>
//      </div>
//    )
//  }
//})
//
//render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Wrapping TabList also breaks (no more active styles), lets check context for
// isActive and the click handler instead of props

//const TabList = React.createClass({
//  contextTypes: {
//    activeIndex: React.PropTypes.number,
//    onActivate: React.PropTypes.func
//  },
//
//  render() {
//    const children = React.Children.map(this.props.children, (child, index) => (
//      React.cloneElement(child, {
//        isActive: index === this.context.activeIndex,
//        onClick: () => this.context.onActivate(index)
//      })
//    ))
//
//    return <div style={styles.tabs}>{children}</div>
//  }
//})
//
//const Tab = React.createClass({
//  render() {
//    return (
//      <div
//        onClick={this.props.disabled ? null : this.props.onClick}
//        style={this.props.disabled ? styles.disabledTab : (
//          this.props.isActive ? styles.activeTab : styles.tab
//        )}
//      >
//        {this.props.children}
//      </div>
//    )
//  }
//})
//
//const TabPanels = React.createClass({
//  contextTypes: {
//    activeIndex: React.PropTypes.number
//  },
//
//  render() {
//    return (
//      <div style={styles.tabPanels}>
//        {this.props.children[this.context.activeIndex]}
//      </div>
//    )
//  }
//})
//
//const Tabs = React.createClass({
//  childContextTypes: {
//    activeIndex: React.PropTypes.number,
//    onActivate: React.PropTypes.func
//  },
//
//  getInitialState() {
//    return {
//      activeIndex: 0
//    }
//  },
//
//  getChildContext() {
//    return {
//      activeIndex: this.state.activeIndex,
//      onActivate: (activeIndex) => {
//        this.setState({ activeIndex })
//      }
//    }
//  },
//
//  render() {
//    return <div>{this.props.children}</div>
//  }
//})
//
//const App = React.createClass({
//  render() {
//    return (
//      <div>
//        <Tabs>
//          <div>
//            <TabList>
//              <Tab>Tacos</Tab>
//              <Tab disabled>Burritos</Tab>
//              <Tab>Coconut Korma</Tab>
//            </TabList>
//          </div>
//
//          <div>
//            <TabPanels>
//              <p>Tacos are delicious</p>
//              <p>Sometimes a burrito is what you really need.</p>
//              <p>Might be your best option.</p>
//            </TabPanels>
//          </div>
//        </Tabs>
//      </div>
//    )
//  }
//})
//
//render(<App/>, document.getElementById('app'))
