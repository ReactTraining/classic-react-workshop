var React = require('react');

var DATA = [
  { id: 1, name: 'USA', description: 'Land of the Free, Home of the brave' },
  { id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival' },
  { id: 3, name: 'Russia', description: 'World Cup 2018!' },
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

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: '#000'
};

styles.panel = {
  padding: 10
};

var Tabs = React.createClass({
  propTypes: {
    data: React.PropTypes.array
  },

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
        key={this.props.data[index].id}
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
        <div className="TabPanel" style={styles.panel}>
          {this.props.data[this.state.activeIndex].description}
        </div>
      </div>
    );
  }
});

module.exports = Tabs;
