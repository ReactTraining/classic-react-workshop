import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
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

class TabList extends React.Component {
  render() {
    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        isActive: index === this.props.activeIndex,
        onClick: () => this.props.onActivate(index)
      })
    })

    return <div style={styles.tabs}>{children}</div>
  }
}

class Tab extends React.Component {
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
}

class TabPanels extends React.Component {
  render() {
    return (
      <div style={styles.tabPanels}>
        {this.props.children[this.props.activeIndex]}
      </div>
    )
  }
}

class TabPanel extends React.Component {
  render() {
    return <div>{this.props.children}</div>
  }
}

class Tabs extends React.Component {
  state = {
    activeIndex: 0
  }

  render() {
    const children = React.Children.map(this.props.children, (child, index) => {
      if (child.type === TabPanels) {
        return React.cloneElement(child, {
          activeIndex: this.state.activeIndex
        })
      } else if (child.type === TabList) {
        return React.cloneElement(child, {
          activeIndex: this.state.activeIndex,
          onActivate: index => this.setState({ activeIndex: index })
        })
      } else {
        return child
      }
    })

    return <div>{children}</div>
  }
}

class App extends React.Component {
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
            <TabPanel><p>Tacos are delicious</p></TabPanel>
            <TabPanel><p>Sometimes a burrito is what you really need</p></TabPanel>
            <TabPanel><p>Might be your best option</p></TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Wrapping <TabPanels> in a div breaks everything! Instead of using
// cloneElement, let's use context.

// class TabList extends React.Component {
//   render() {
//     const children = React.Children.map(this.props.children, (child, index) => {
//       return React.cloneElement(child, {
//         isActive: index === this.props.activeIndex,
//         onClick: () => this.props.onActivate(index)
//       })
//     })
//     return <div style={styles.tabs}>{children}</div>
//   }
// }
//
// class Tab extends React.Component {
//   render() {
//     return (
//       <div
//         onClick={this.props.disabled ? null : this.props.onClick}
//         style={this.props.disabled ? styles.disabledTab : (
//           this.props.isActive ? styles.activeTab : styles.tab
//         )}
//       >
//         {this.props.children}
//       </div>
//     )
//   }
// }
//
// class TabPanels extends React.Component {
//   static contextTypes = {
//     activeIndex: PropTypes.number
//   }
//
//   render() {
//     return (
//       <div style={styles.tabPanels}>
//         {this.props.children[this.context.activeIndex]}
//       </div>
//     )
//   }
// }
//
// class TabPanel extends React.Component {
//   render() {
//     return <div>{this.props.children}</div>
//   }
// }
//
// class Tabs extends React.Component {
//   static childContextTypes = {
//     activeIndex: PropTypes.number
//   }
//
//   getChildContext () {
//     return {
//       activeIndex: this.state.activeIndex
//     }
//   }
//
//   state = {
//     activeIndex: 0
//   }
//
//   render() {
//     const children = React.Children.map(this.props.children, (child, index) => {
//       if (child.type === TabList) {
//         return React.cloneElement(child, {
//           activeIndex: this.state.activeIndex,
//           onActivate: index => this.setState({ activeIndex: index })
//         })
//       } else {
//         return child
//       }
//     })
//
//     return <div>{children}</div>
//   }
// }
//
// class App extends React.Component {
//   render () {
//     return (
//       <div>
//         <Tabs>
//           <TabList>
//             <Tab>Tacos</Tab>
//             <Tab disabled>Burritos</Tab>
//             <Tab>Coconut Korma</Tab>
//           </TabList>
//           <div>
//             <TabPanels>
//               <TabPanel><p>Tacos are delicious</p></TabPanel>
//               <TabPanel><p>Sometimes a burrito is what you really need</p></TabPanel>
//               <TabPanel><p>Might be your best option</p></TabPanel>
//             </TabPanels>
//           </div>
//         </Tabs>
//       </div>
//     )
//   }
// }
//
// ReactDOM.render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Wrapping <TabList> also breaks (no more active styles), lets check context
// for isActive and the click handler instead of props.

// class TabList extends React.Component {
//   static contextTypes = {
//     activeIndex: PropTypes.number,
//     onActivate: PropTypes.func
//   }
//
//   render() {
//     const children = React.Children.map(this.props.children, (child, index) => (
//       React.cloneElement(child, {
//         isActive: index === this.context.activeIndex,
//         onClick: () => this.context.onActivate(index)
//       })
//     ))
//
//     return <div style={styles.tabs}>{children}</div>
//   }
// }
//
// class Tab extends React.Component {
//   render() {
//     return (
//       <div
//         onClick={this.props.disabled ? null : this.props.onClick}
//         style={this.props.disabled ? styles.disabledTab : (
//           this.props.isActive ? styles.activeTab : styles.tab
//         )}
//       >
//         {this.props.children}
//       </div>
//     )
//   }
// }
//
// class TabPanels extends React.Component {
//   static contextTypes = {
//     activeIndex: PropTypes.number
//   }
//
//   render() {
//     return (
//       <div style={styles.tabPanels}>
//         {this.props.children[this.context.activeIndex]}
//       </div>
//     )
//   }
// }
//
// class TabPanel extends React.Component {
//   render() {
//     return <div>{this.props.children}</div>
//   }
// }
//
// class Tabs extends React.Component {
//   static childContextTypes = {
//     activeIndex: PropTypes.number,
//     onActivate: PropTypes.func
//   }
//
//   getChildContext() {
//     return {
//       activeIndex: this.state.activeIndex,
//       onActivate: index => this.setState({ activeIndex: index })
//     }
//   }
//
//   state = {
//     activeIndex: 0
//   }
//
//   render() {
//     return <div>{this.props.children}</div>
//   }
// }
//
// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <Tabs>
//           <div>
//             <TabList>
//               <Tab>Tacos</Tab>
//               <Tab disabled>Burritos</Tab>
//               <Tab>Coconut Korma</Tab>
//             </TabList>
//           </div>
//           <div>
//             <TabPanels>
//               <TabPanel><p>Tacos are delicious</p></TabPanel>
//               <TabPanel><p>Sometimes a burrito is what you really need</p></TabPanel>
//               <TabPanel><p>Might be your best option</p></TabPanel>
//             </TabPanels>
//           </div>
//         </Tabs>
//       </div>
//     )
//   }
// }
//
// ReactDOM.render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// It's generally good practice to use a namespace on context to avoid conflicts
// with other libraries that are also using context. For example, react-router
// uses context.router. Here, we could use context.tabs.
