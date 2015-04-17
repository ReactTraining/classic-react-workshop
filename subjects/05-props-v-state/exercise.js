////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// make tabs a "pure component" by not managing any of its own state, instead
// add a property to tell it which tab to show, and then have it communicate
// with its owner to get rerendered with a new active tab.
//
// Why would you move that state up? you might have a workflow where they can't
// progress from one step to the next until they've completed some sort of task
// but they can go back if they'd like. If the tabs keep their own state you
// can't control them with your application logic.
//
// Already done?
//
// Now put state back into the tabs (so that they can be used w/o a the owner
// being required to manage state) and synchronize the state between the App
// and Tabs.
////////////////////////////////////////////////////////////////////////////////
var React = require('react');
var styles = require('./lib/styles');
var data = require('./lib/data');

var Tabs = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired
  },

  getInitialState () {
    return {
      activeTabIndex: 0
    };
  },

  handleTabClick (activeTabIndex) {
    this.setState({ activeTabIndex });
  },

  renderTabs () {
    return this.props.data.map((tab, index) => {
      var style = this.state.activeTabIndex === index ?
        styles.activeTab : styles.tab;
      var clickHandler = this.handleTabClick.bind(this, index);
      return (
        <div className="Tab" key={tab.name} style={style} onClick={clickHandler}>
          {tab.name}
        </div>
      );
    });
  },

  renderPanel () {
    var tab = this.props.data[this.state.activeTabIndex];
    return (
      <div>
        <p>{tab.description}</p>
      </div>
    );
  },

  render () {
    return (
      <div style={styles.app}>
        <div style={styles.tabs}>
          {this.renderTabs()}
        </div>
        <div style={styles.tabPanels}>
          {this.renderPanel()}
        </div>
      </div>
    );
  }
});

var App = React.createClass({
  render () {
    return (
      <div>
        <h1>Props v. State</h1>
        <Tabs ref="tabs" data={this.props.tabs}/>
      </div>
    );
  }
});

var assert = require('../shared/assert');

var component = React.render(<App tabs={data}/>, document.getElementById('app'), () => {
  setTimeout(() => {
    require('./tests').run(component);
  }, 0);
});

