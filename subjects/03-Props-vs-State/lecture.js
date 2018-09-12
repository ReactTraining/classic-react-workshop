import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";

function ContentToggle(props) {
  let summaryClassName = "content-toggle-summary";

  if (props.isOpen) {
    summaryClassName += " content-toggle-summary-open";
  }

  return (
    <div style={props.style} className="content-toggle">
      <button
        onClick={() => {
          if (props.onToggle) {
            props.onToggle(!props.isOpen);
          }
        }}
        className={summaryClassName}
      >
        {props.summary}
      </button>
      <div className="content-toggle-details">
        {props.isOpen && props.children}
      </div>
    </div>
  );
}

class StatefulContentToggle extends React.Component {
  state = { isOpen: false };
  render() {
    return (
      <ContentToggle
        {...this.props}
        isOpen={this.state.isOpen}
        onToggle={isOpen => this.setState({ isOpen })}
      />
    );
  }
}

import carnitas from "./images/carnitas.png";
import pollo from "./images/pollo.png";
import asada from "./images/asada.png";

class App extends React.Component {
  state = {
    tacos: [
      { id: 0, name: "Carnitas", src: carnitas, open: false },
      { id: 1, name: "Pollo", src: pollo, open: false },
      { id: 2, name: "Asada", src: asada, open: false }
    ]
  };

  toggleAll = isOpen => {
    this.setState({
      tacos: this.state.tacos.map(t => {
        t.open = isOpen;
        return t;
      })
    });
  };

  handleTacoToggle = (taco, isOpen) => {
    this.setState({
      tacos: this.state.tacos.map(t => {
        if (t === taco) t.open = isOpen;
        return t;
      })
    });
  };

  render() {
    const allOpen = this.state.tacos.every(t => t.open);

    return (
      <div>
        <StatefulContentToggle summary="Shrimp">
          <p>are the best</p>
        </StatefulContentToggle>

        <button onClick={() => this.toggleAll(!allOpen)}>
          {allOpen ? "Close" : "Open"} All
        </button>

        <div>
          {this.state.tacos.map(taco => (
            <ContentToggle
              key={taco.name}
              style={{ width: 300 }}
              summary={taco.name}
              isOpen={taco.open}
              onToggle={isOpen => this.handleTacoToggle(taco, isOpen)}
            >
              <div
                style={{
                  height: 200,
                  background: `url(${taco.src})`,
                  backgroundSize: "cover"
                }}
              />
            </ContentToggle>
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
