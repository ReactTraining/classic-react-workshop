var React = require('react');

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

module.exports = React;
