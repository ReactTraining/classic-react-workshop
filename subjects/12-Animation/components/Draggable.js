import React from "react";
import PropTypes from "prop-types";

class Draggable extends React.Component {
  static propTypes = {
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      .isRequired,
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    onDrop: PropTypes.func
  };

  static defaultProps = {
    component: "div"
  };

  componentDidMount() {
    this.isDragging = false;
    document.addEventListener("mouseup", this.handleMouseUp);
    document.addEventListener("mousemove", this.handleMouseMove);
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseDown = event => {
    if (!this.isDragging) {
      this.isDragging = true;

      // Prevent Chrome from displaying a text cursor
      event.preventDefault();

      if (this.props.onDragStart) this.props.onDragStart(event);
    }
  };

  handleMouseMove = event => {
    if (this.isDragging && this.props.onDrag) this.props.onDrag(event);
  };

  handleMouseUp = event => {
    if (this.isDragging) {
      this.isDragging = false;

      if (this.props.onDrop) this.props.onDrop(event);
    }
  };

  render() {
    const { component, ...otherProps } = this.props;

    return React.createElement(component, {
      ...otherProps,
      onMouseDown: this.handleMouseDown
    });
  }
}

export default Draggable;
