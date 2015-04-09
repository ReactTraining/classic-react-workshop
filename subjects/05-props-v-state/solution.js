var React = require('react');
var styles = require('./lib/styles');
var data = require('./lib/data');

var Tabs = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired,
    activeTabIndex: React.PropTypes.number.isRequired,
    onActivateTab: React.PropTypes.func.isRequired,
  },

  handleTabClick (activeTabIndex) {
    this.props.onActivateTab(activeTabIndex);
  },

  renderTabs () {
    return this.props.data.map((tab, index) => {
      var style = this.props.activeTabIndex === index ?
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
    var tab = this.props.data[this.props.activeTabIndex];
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
  getInitialState () {
    return {
      activeTabIndex: 0
    };
  },

  handleActivateTab (activeTabIndex) {
    this.setState({ activeTabIndex });
  },

  render () {
    return (
      <div>
        <h1>Props v. State</h1>
        <Tabs
          ref="tabs"
          data={this.props.tabs}
          activeTabIndex={this.state.activeTabIndex}
          onActivateTab={this.handleActivateTab}
        />
      </div>
    );
  }
});

var component = React.render(<App tabs={data}/>, document.getElementById('app'), () => {
  setTimeout(() => {
    require('./tests').run(component);
  }, 0);
});

