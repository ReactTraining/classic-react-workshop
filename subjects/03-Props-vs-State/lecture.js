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
        onClick={() => props.onToggle(!props.isOpen)}
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
        onToggle={open => this.setState({ isOpen: open })}
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

  toggleAll = open => {
    this.setState({
      tacos: this.state.tacos.map(taco => ({
        ...taco,
        open: open
      }))
    });
  };

  handleTacoToggle = (taco, open) => {
    this.setState({
      tacos: this.state.tacos.map(t => {
        if (t === taco) t.open = open;
        return t;
      })
    });
  };

  render() {
    const allOpen = this.state.tacos.every(t => t.open);

    return (
      <div>
        <StatefulContentToggle summary="Shrimp" isOpen={true}>
          <p>are good</p>
        </StatefulContentToggle>

        <button onClick={() => this.toggleAll(!allOpen)}>
          {allOpen ? "Close" : "Open"} all
        </button>

        <div>
          {this.state.tacos.map(taco => (
            <ContentToggle
              key={taco.name}
              style={{ width: 300 }}
              summary={taco.name}
              isOpen={taco.open}
              onToggle={open => this.handleTacoToggle(taco, open)}
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
