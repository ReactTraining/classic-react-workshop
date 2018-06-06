import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";

// Pure component!
// Dumb/stateless component!
function ContentToggle(props) {
  const handleClick = () => {
    if (props.onToggle) {
      props.onToggle(!props.isOpen);
    }
  };

  let summaryClassName = "content-toggle-summary";

  if (props.isOpen) {
    summaryClassName += " content-toggle-summary-open";
  }

  return (
    <div style={props.style} className="content-toggle">
      <button onClick={handleClick} className={summaryClassName}>
        {props.summary}
      </button>
      <div className="content-toggle-details">
        {props.isOpen && props.children}
      </div>
    </div>
  );
}

// Compositon is better than inheritance.

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

    // 4. Composition!

    return (
      <div>
        <StatefulContentToggle summary="Tacos">
          <p>Are the best!</p>
        </StatefulContentToggle>

        <button onClick={() => this.toggleAll(!allOpen)}>
          Toggle Everything Below This Button
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
