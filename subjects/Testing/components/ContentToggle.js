import React from 'react'

class ContentToggle extends React.Component {
  handleClick = () => {
    if (this.props.onToggle)
      this.props.onToggle(!this.props.isOpen)
  }

  render() {
    let summaryClassName = "ContentToggle__Summary"

    if (this.props.isOpen)
      summaryClassName += " ContentToggle__Summary--is-open"

    return (
      <div {...this.props} className="ContentToggle">
        <button onClick={this.handleClick} className={summaryClassName}>
          {this.props.summary}
        </button>
        <div className="ContentToggle__Details">
          {this.props.isOpen && this.props.children}
        </div>
      </div>
    )
  }
}

export default ContentToggle
