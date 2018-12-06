import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

// class ContentToggle extends React.Component {
//   static propTypes = {
//     summary: PropTypes.string.isRequired,
//     children: PropTypes.node.isRequired,
//     onToggle: PropTypes.func
//   };

//   constructor(props) {
//     super(props);
//     this.state = { isOpen: false };
//     this.handleClick = () => {
//       this.setState({ isOpen: !this.state.isOpen });
//       if (this.props.onToggle) this.props.onToggle();
//     };
//   }

//   render() {
//     let summaryClassName = "content-toggle-summary";

//     if (this.state.isOpen) {
//       summaryClassName += " content-toggle-summary-open";
//     }

//     return (
//       <div className="content-toggle">
//         <button onClick={this.handleClick} className={summaryClassName}>
//           {this.props.summary}
//         </button>
//         {this.state.isOpen && (
//           <div className="content-toggle-details">
//             {this.props.children}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// ReactDOM.render(
//   <div>
//     <ContentToggle
//       summary="Tacos"
//       onToggle={() => console.log("toggle!")}
//     >
//       <p>
//         A taco is a traditional Mexican dish composed of a corn or wheat
//         tortilla folded or rolled around a filling.
//       </p>
//     </ContentToggle>

//     <ContentToggle summary="Burritos">
//       <p>
//         <strong>delicious</strong>
//       </p>
//     </ContentToggle>
//   </div>,
//   document.getElementById("app")
// );

function ContentToggle(props) {
  let summaryClassName = "content-toggle-summary";

  if (props.isOpen) {
    summaryClassName += " content-toggle-summary-open";
  }

  return (
    <div className="content-toggle">
      <button
        onClick={() => {
          if (props.onToggle) props.onToggle();
        }}
        className={summaryClassName}
      >
        {props.summary}
      </button>
      {props.isOpen && (
        <div className="content-toggle-details">{props.children}</div>
      )}
    </div>
  );
}

ContentToggle.propTypes = {
  summary: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onToggle: PropTypes.func
};

class StatefulContentToggle extends React.Component {
  state = { isOpen: false };
  render() {
    return (
      <ContentToggle
        {...this.props}
        isOpen={this.state.isOpen}
        onToggle={() => this.setState({ isOpen: !this.state.isOpen })}
      />
    );
  }
}

class ContentToggleGroup extends React.Component {
  state = { tacoIsOpen: true, burritoIsOpen: true };

  toggleAll = () => {
    this.setState({
      tacoIsOpen: !this.state.tacoIsOpen,
      burritoIsOpen: !this.state.burritoIsOpen
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleAll}>Toggle All</button>

        <ContentToggle
          summary="Tacos"
          isOpen={this.state.tacoIsOpen}
          onToggle={() =>
            this.setState({ tacoIsOpen: !this.state.tacoIsOpen })
          }
        >
          <p>
            A taco is a traditional Mexican dish composed of a corn or
            wheat tortilla folded or rolled around a filling.
          </p>
        </ContentToggle>

        <ContentToggle
          summary="Burritos"
          isOpen={this.state.burritoIsOpen}
          onToggle={() =>
            this.setState({ burritoIsOpen: !this.state.burritoIsOpen })
          }
        >
          <p>
            <strong>delicious</strong>
          </p>
        </ContentToggle>

        <StatefulContentToggle summary="Tostadas">
          <p>
            A taco is a traditional Mexican dish composed of a corn or
            wheat tortilla folded or rolled around a filling.
          </p>
        </StatefulContentToggle>
      </div>
    );
  }
}

ReactDOM.render(<ContentToggleGroup />, document.getElementById("app"));
