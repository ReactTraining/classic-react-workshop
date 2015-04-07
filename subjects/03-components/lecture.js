import React from 'react';


////////////////////////////////////////////////////////////////////////////////
// Instead of manipulating the DOM, we can modify our render() function so that
// it just returns a description of what the page should look like. Then we can
// call it as often as we want, whenever things change.
var isOpen = false;

function handleClick() {
  isOpen = !isOpen;
  updateThePage();
}

function render() {
  return (
    <div className="ContentToggle">
      <div onClick={handleClick} className="ContentToggle__Summary">
        Tacos
      </div>
      <div className="ContentToggle__Details">
        {isOpen && (
          <p>
            A taco is a traditional Mexican dish composed of a corn or wheat
            tortilla folded or rolled around a filling. A taco can be made with a
            variety of fillings, including beef, pork, chicken, seafood,
            vegetables and cheese, allowing for great versatility and variety. A
            taco is generally eaten without utensils and is often accompanied
            by garnishes such as salsa, avocado or guacamole, cilantro
            (coriander), tomatoes, minced meat, onions and lettuce.
          </p>
        )}
      </div>
    </div>
  );
}

function updateThePage() {
  React.render(render(), document.getElementById('app'));
}

updateThePage();

////////////////////////////////////////////////////////////////////////////////
// Let's add a setState function that we can use to update state and
// automatically update the page

var state = {
  isOpen: false
};

function setState(nextState) {
  for (var property in nextState)
    if (nextState.hasOwnProperty(property))
      state[property] = nextState[property];

  updateThePage();
}

function handleClick() {
  setState({
    isOpen: !state.isOpen
  });
}

function render() {
  return (
    <div className="ContentToggle">
      <div onClick={handleClick} className="ContentToggle__Summary">
        Tacos
      </div>
      <div className="ContentToggle__Details">
        {state.isOpen && (
          <p>
            A taco is a traditional Mexican dish composed of a corn or wheat
            tortilla folded or rolled around a filling. A taco can be made with a
            variety of fillings, including beef, pork, chicken, seafood,
            vegetables and cheese, allowing for great versatility and variety. A
            taco is generally eaten without utensils and is often accompanied
            by garnishes such as salsa, avocado or guacamole, cilantro
            (coriander), tomatoes, minced meat, onions and lettuce.
          </p>
        )}
      </div>
    </div>
  );
}

function updateThePage() {
  React.render(render(), document.getElementById('app'));
}

updateThePage();

////////////////////////////////////////////////////////////////////////////////

var ContentToggle = React.createClass({

  getInitialState: function () {
    return {
      isOpen: false
    };
  },

  handleClick: function (event) {
    event.preventDefault();

    this.setState({
      isOpen: !this.state.isOpen
    });
  },

  render: function () {
    return (
      <div className="ContentToggle">
        <div onClick={this.handleClick} className="ContentToggle__Summary">
          Tacos
        </div>
        <div className="ContentToggle__Details">
          {isOpen && (
            <p>
              A taco is a traditional Mexican dish composed of a corn or wheat
              tortilla folded or rolled around a filling. A taco can be made with a
              variety of fillings, including beef, pork, chicken, seafood,
              vegetables and cheese, allowing for great versatility and variety. A
              taco is generally eaten without utensils and is often accompanied
              by garnishes such as salsa, avocado or guacamole, cilantro
              (coriander), tomatoes, minced meat, onions and lettuce.
            </p>
          )}
        </div>
      </div>
    );
  }

});
