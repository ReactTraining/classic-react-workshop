import React from "react";
import PropTypes from "prop-types";

class LoadingDots extends React.Component {
  static propTypes = {
    interval: PropTypes.number,
    dots: PropTypes.number
  };

  static defaultProps = {
    interval: 300,
    dots: 3
  };

  state = { frame: 1 };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        frame: this.state.frame + 1
      });
    }, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let dots = this.state.frame % (this.props.dots + 1);
    let text = "";
    while (dots > 0) {
      text += ".";
      dots--;
    }
    return <span>{text}&nbsp;</span>;
  }
}

export default LoadingDots;
