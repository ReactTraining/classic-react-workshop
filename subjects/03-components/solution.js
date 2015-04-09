////////////////////////////////////////////////////////////////////////////////
// Excercise:
// - render the data as tabs, with their `name` as the label in the tab
//   and their `description` inside the tab panel
// - make it so that you can click a tab label and the panel renders
//   the correct content
// - make sure the active tab has the active styles
////////////////////////////////////////////////////////////////////////////////
var React = require('react');
var assign = require('object-assign');

var DATA = [
  { name: 'USA', description: 'Land of the Free, Home of the brave' },
  { name: 'China', description: 'Lots of concrete' },
  { name: 'Russia', description: 'World Cup 2018!' },
];

var styles = {};

styles.tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
};

styles.activeTab = assign({}, styles.tab, {
  borderBottomColor: '#000'
});

styles.panel = {
  padding: 10
};

var Tabs = React.createClass({
  getInitialState () {
    return {
      activeIndex: 0
    };
  },

  handleTabClick (index) {
    this.setState({
      activeIndex: index
    });
  },

  renderTabs () {
    return this.props.data.map((item, index) => {
      var style = index === this.state.activeIndex ?
        styles.activeTab : styles.tab;
      return <div
        className="Tab"
        style={style}
        onClick={this.handleTabClick.bind(this, index)}
        children={item.name}
      />;
    });
  },

  render () {
    return (
      <div className="Tabs">
        <div>
          {this.renderTabs()}
        </div>
        <div className="TabPanels" style={styles.panel}>
          {this.props.data[this.state.activeIndex].description}
        </div>
      </div>
    );
  }
});

var App = React.createClass({
  render () {
    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={this.props.countries}/>
      </div>
    );
  }
});

React.render(<App countries={DATA}/>, document.getElementById('app'), () => {
  require('./tests').run();
});

