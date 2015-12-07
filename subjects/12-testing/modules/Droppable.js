import React from 'react'

const style = {
  border: '3px solid #ccc',
  padding: 50,
  margin: 10,
  width: 200,
  textAlign: 'center',
  display: 'inline-block'
}

const Droppable = React.createClass({
  getInitialState() {
    return {
      acceptDrop: false
    }
  },

  handleDragOver(event) {
    if (event.dataTransfer.types[0] === 'Files') {
      event.preventDefault()
      this.setState({
        acceptDrop: true
      })
    }
  },

  handleDrop(event) {
    event.preventDefault()
    event.stopPropagation()
    this.setState({ acceptDrop: false })
  },

  render () {
    return (
      <div
        className="Droppable"
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
        style={style}
      >
        {this.state.acceptDrop ? 'Drop it!' : 'Drag a file here'}
      </div>
    )
  }
})

export default Droppable

