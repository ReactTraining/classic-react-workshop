import React from 'react';
import immstruct from 'immstruct';
import Immutable from 'immutable';

var structure = immstruct.withHistory('app', {
  points: [],
  name: 'Drawing Pad'
});

var DrawingPad = React.createClass({
  getInitialState () {
    return {
      drawing: false
    };
  },

  maybeDraw (e) {
    if (this.state.drawing)
      this.props.cursor.update('points', (points) => {
        return points.push([e.clientX, e.clientY]);
      });
  },

  render () {
    var points = this.props.cursor.get('points');
    return (
      <div>
        <div
          style={{
            cursor: 'crosshair',
            position: 'fixed',
            top: 120,
            left: 0,
            right: 0,
            bottom: 0,
            WebkitUserSelect: 'none',
            background: '#fff'
          }}
          onMouseDown={() => this.setState({ drawing: true })}
          onMouseUp={() => this.setState({ drawing: false})}
          onMouseMove={this.maybeDraw}
        >
          {points.map((point, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: 10,
              height: 10,
              background: '#333',
              left: point[0],
              top: point[1] - 120,
              borderRadius: '50%'
            }}/>
          ))}
        </div>
      </div>
    );
  }
});

var App = React.createClass({
  handleSlider (e) {
    setHistory(parseInt(e.target.value, 10));
  },

  render () {
    var { structure } = this.props;
    var cursor = structure.cursor();
    var historyCount = structure.history.count();
    return (
      <div>
        <h1>{cursor.get('name')}</h1>
        <input onChange={(e) => cursor.update('name', () => e.target.value)}/>
        <div>
          <input
            type="range"
            onChange={this.handleSlider}
            min="0"
            max={historyCount}
            value={structure._currentRevision}
            style={{width: 400}}
          />
        </div>
        <DrawingPad cursor={cursor}/>
      </div>
    );
  }
});

structure.on('swap', render);
render();

function setHistory (frame) {
  var count = structure.history.count();
  var current = structure._currentRevision;
  if (frame > current)
    redo(frame - current);
  else if (frame < current)
    undo(current - frame);

}

function undo (amt) {
  structure.undo(amt);
  render();
}

function redo (amt) {
  structure.redo(amt);
  render();
}

function render () {
  React.render(<App structure={structure}/>, document.getElementById('app'));
}


