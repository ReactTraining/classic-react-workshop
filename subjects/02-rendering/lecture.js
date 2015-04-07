import React from 'react';

var isOpen = false;

function handleClick() {
  isOpen = !isOpen;
  render();
}

function render() {
  React.render((
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
  ), document.getElementById('app'));
}

render();
