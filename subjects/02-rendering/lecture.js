var React = require('react');
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
//function handleClick() {
  //alert('clicked some more!');
//};
//var element = React.DOM.button({onClick: handleClick}, 'alert!');
//React.render(element, appElement);


////////////////////////////////////////////////////////////////////////////////
// you get an event, as you'd expect
//function handleClick() {
  //console.log(event.button);
//};
//var element = React.DOM.button({ onMouseDown: handleClick }, 'log button');
//React.render(element, appElement);


////////////////////////////////////////////////////////////////////////////////
// JSX is simply different syntax for calling functions
//var element = <div className="App">
                //<h1 className="Title">Hello!</h1>
                //<p>Pork Carnitas street tacos are the best</p>
              //</div>;

//var { div, h1, p } = React.DOM;
//var element = div({ className: "App" },
                //h1({ className: "Title" }, 'Hello!'),
                //p({}, 'Pork Carnitas street tacos are the best')
              //);

//React.render(element, appElement);

////////////////////////////////////////////////////////////////////////////////
// Its not a special "template" language where you have to "register" things
// to be available, its Just JavaScript™, so you use JavaScript scope, no
// template globals :D
//var divide = React.DOM.div;
//React.render(<divide>lol</divide>, appElement);


////////////////////////////////////////////////////////////////////////////////
// no special template syntax/helpers, just use Array methods on lists
//var tacos = [
  //{ name: 'Carnitas' },
  //{ name: 'Pollo' },
  //{ name: 'Asada' }
//];

//React.render((
  //<ul>
    //{tacos.map(taco => (
      //<li>{taco.name}</li>
    //))}
  //</ul>
//), appElement);


////////////////////////////////////////////////////////////////////////////////
// lets say we want to generate this HTML
//<select name="month">
 //<option>(01) January</option>
 //<option>(02) February</option>
 //...
//</select>

// in angular we'd have something like this:
//<select name="month">
  //<option ng-repeat="month in months">
    //({{$index | padMonth}}) {{month}}
  //</option>
//</select>

// Things you have to learn to make this work:
// - ng-repeat
// - `month in months` DSL
// - auto-injected `$index`
// - that `|` is called a filter so you can google to learn...
// - ... how to create a filter
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

function padMonth(index) {
  var realIndex = index + 1;
  return realIndex > 9 ? ''+realIndex : '0'+realIndex;
}

//var monthSelect = (
  //<select>
    //{months.map((month, index) => (
      //<option>({padMonth(index)}) {month}</option>
    //))}
  //</select>
//);

// Things you have to know
// - JavaScript
// - JSX ... or not

//var { select, option } = React.DOM;
//var monthSelect = select({}, months.map((month, index) => {
  //return option({}, `(${padMonth(index)}) ${month}`);
//}));
//React.render(monthSelect, appElement);


////////////////////////////////////////////////////////////////////////////////
// Because React is generally just a bunch of functions, you don't have to ask
// React how to solve a problem in your app, you can use everything you know
// about programming already.
function monthOption(month, index) {
  return <option>({padMonth(index)}) {month})</option>;
}

function monthSelect() {
  return <select>{months.map(monthOption)}</select>;
}

React.render(monthSelect(), appElement);


//////////////////////////////////////////////////////////////////////////////////
// Lets make a thing
//var isOpen = false;

//function handleClick() {
  //isOpen = !isOpen;
  //updateThePage();
//}

//function render() {
  //var summaryClassName = 'ContentToggle__Summary';
  //if (isOpen)
    //summaryClassName += ' ContentToggle__Summary--is-open';

  //return (
    //<div className="ContentToggle">
      //<button onClick={handleClick} className={summaryClassName}>
        //Tacos
      //</button>
      //{isOpen && (
        //<div className="ContentToggle__Details">
          //<p>
            //A taco is a traditional Mexican dish composed of a corn or wheat
            //tortilla folded or rolled around a filling. A taco can be made with a
            //variety of fillings, including beef, pork, chicken, seafood,
            //vegetables and cheese, allowing for great versatility and variety. A
            //taco is generally eaten without utensils and is often accompanied
            //by garnishes such as salsa, avocado or guacamole, cilantro
            //(coriander), tomatoes, minced meat, onions and lettuce.
          //</p>
        //</div>
      //)}
    //</div>
  //);
//}

//function updateThePage() {
  //React.render(render(), appElement);
//}

//updateThePage();


////////////////////////////////////////////////////////////////////////////////
// - Always rerender
// - Virtual DOM makes it efficient
// - its like PHP but EVEN BETTER
