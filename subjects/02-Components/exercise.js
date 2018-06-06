////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render a tab for each country with its name in the tab
// - When you click on a tab, make it appear to be active while the others
//   appear inactive
// - Render the correct content for the selected tab in the panel
//
// Got extra time?
//
// - Make <Tabs> generic so that it doesn't know anything about
//   country data (Hint: good propTypes help)
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const styles = {};

styles.tab = {
  display: "inline-block",
  padding: 10,
  margin: 10,
  borderBottom: "4px solid",
  borderBottomColor: "#ccc",
  cursor: "pointer"
};

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: "#000"
};

styles.panel = {
  padding: 10
};

const countryType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
});

const tabType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired
});

class Tabs extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(tabType)
  };

  state = { activeIndex: 0 };

  handleClick = index => {
    this.setState({ activeIndex: index });
  };

  render() {
    const { data } = this.props;

    return (
      <div className="Tabs">
        {data.map((tab, index) => (
          <div
            className="Tab"
            style={
              index === this.state.activeIndex
                ? styles.activeTab
                : styles.tab
            }
            onClick={() => this.handleClick(index)}
            key={index}
          >
            {tab.label}
          </div>
        ))}
        <div className="TabPanel" style={styles.panel}>
          {data[this.state.activeIndex].content}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    const data = this.props.countries.map(country => ({
      label: country.name,
      content: <p>{country.description}</p>
    }));

    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={data} />
      </div>
    );
  }
}

const DATA = [
  {
    id: 1,
    name: "USA",
    description: "Land of the Free, Home of the brave"
  },
  {
    id: 2,
    name: "Brazil",
    description: "Sunshine, beaches, and Carnival"
  },
  { id: 3, name: "Russia", description: "World Cup 2018!" }
];

ReactDOM.render(
  <App countries={DATA} />,
  document.getElementById("app")
);

require("./tests").run();
