import React from 'react';
var appElement = document.getElementById('app');

////////////////////////////////////////////////////////////////////////////////
// React components are really just functions that take attributes
//var element = React.DOM.input({type: 'text'});
//React.render(element, appElement);

////////////////////////////////////////////////////////////////////////////////
// You can also pass in children as extra arguments
//var element = React.DOM.select({value: '2'},
                                //React.DOM.option({value: '1'}, 'one'),
                                //React.DOM.option({value: '2'}, 'two'),
                                //React.DOM.option({value: '3'}, 'three')
                              //);
//React.render(element, appElement);


////////////////////////////////////////////////////////////////////////////////
// And build up more UI
//var { div, select, option, h1 } = React.DOM;
//var element = div({},
                  //h1({className: 'hot'}, "These are just functions"),
                  //select({value: '2'},
                    //option({value: '1'}, 'one'),
                    //option({value: '2'}, 'two'),
                    //option({value: '3'}, 'three')
                  //)
                 //);
//React.render(element, appElement);


////////////////////////////////////////////////////////////////////////////////
// lets look at one of them in the console
// don't get upset, `className` is a DOM thing
//console.log(element);


////////////////////////////////////////////////////////////////////////////////
// can pass in functions as event handlers
//var element = React.DOM.button({onClick: function() { alert('clicked!'); }}, 'alert!');
//React.render(element, appElement);


////////////////////////////////////////////////////////////////////////////////
// probably more like this
//function handleClick () {
  //alert('clicked some more!');
//};
//var element = React.DOM.button({onClick: handleClick}, 'alert!');
//React.render(element, appElement);


////////////////////////////////////////////////////////////////////////////////
// you get an event, as you'd expect
//function handleClick () {
  //console.log(event.button);
//};
//var element = React.DOM.button({ onMouseDown: handleClick }, 'log button');
//React.render(element, appElement);


////////////////////////////////////////////////////////////////////////////////
// Lets make a thing
var isOpen = false;

function handleClick() {
  isOpen = !isOpen;
  render();
}

function render () {
  var summaryClassName = 'ContentToggle__Summary';
  if (isOpen)
    summaryClassName += ' ContentToggle__Summary--is-open';

  React.render((
    <div className="ContentToggle">
      <button onClick={handleClick} className={summaryClassName}>
        Tacos
      </button>
      {isOpen && (
        <div className="ContentToggle__Details">
          <p>
            A taco is a traditional Mexican dish composed of a corn or wheat
            tortilla folded or rolled around a filling. A taco can be made with a
            variety of fillings, including beef, pork, chicken, seafood,
            vegetables and cheese, allowing for great versatility and variety. A
            taco is generally eaten without utensils and is often accompanied
            by garnishes such as salsa, avocado or guacamole, cilantro
            (coriander), tomatoes, minced meat, onions and lettuce.
          </p>
        </div>
      )}
    </div>
  ), document.getElementById('app'));
}

render();

////////////////////////////////////////////////////////////////////////////////
// - Always rerender
// - Virtual DOM makes it efficient
// - its like PHP but EVEN BETTER

