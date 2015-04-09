var React = require('react');
// TODO: make sure Michael talks about
// - passing function props to do something "onToggle"
// - concatting className
// - passing along `{...this.props}`
// - propTypes propTypes propTypes!
// - setState callback to ensure state is set (and know rendering is done)

//var ContentToggle = React.createClass({
  //getInitialState () {
    //return {
      //isOpen: false
    //};
  //},

  //handleClick () {
    //this.setState({ isOpen: !this.state.isOpen }, () => {
      //if (this.props.onToggle) this.props.onToggle(this.state.isOpen);
    //});
  //},

  //render () {
    //var summaryClassName = "ContentToggle__Summary";
    //if (this.state.isOpen)
      //summaryClassName += " ContentToggle__Summary--is-open";
    //return (
      //<div {...this.props} className="ContentToggle">
        //<button onClick={this.handleClick} className={summaryClassName}>
          //{this.props.summary}
        //</button>
        //<div className="ContentToggle__Details">
          //{this.state.isOpen && this.props.children}
        //</div>
      //</div>
    //);
  //}
//});

//var App = React.createClass({
  //getInitialState () {
    //return {
      //tacos: [
        //{ name: 'Carnitas', src: 'tacos/carnitas.png' },
        //{ name: 'Pollo', src: 'tacos/pollo.png' },
        //{ name: 'Asada', src: 'tacos/asada.png' },
      //]
    //};
  //},

  //render () {
    //return (
      //<div>
        //<div>
          //{this.state.tacos.map((taco) => (
            //<ContentToggle style={{width: 300}} key={taco.name} summary={taco.name}>
              //<div style={{height: 200, background: `url(${taco.src})`, backgroundSize: 'cover'}}/>
            //</ContentToggle>
          //))}
        //</div>
      //</div>
    //);
  //}
//});

//React.render(<App/>, document.getElementById('app'));

////////////////////////////////////////////////////////////////////////////////
// But what about when we add this feature?
// <button>Toggle All</button>

//var ContentToggle = React.createClass({
  //getInitialState () {
    //return {
      //isOpen: this.props.isOpen
    //};
  //},

  //getDefaultProps () {
    //return {
      //isOpen: false
    //};
  //},

  //componentWillReceiveProps (newProps) {
    //if (newProps.isOpen != null)
      //this.setState({ isOpen: newProps.isOpen });
  //},

  //handleClick () {
    //this.setState({ isOpen: !this.state.isOpen }, () => {
      //if (this.props.onToggle) this.props.onToggle(this.state.isOpen);
    //});
  //},

  //render () {
    //var summaryClassName = "ContentToggle__Summary";
    //if (this.state.isOpen)
      //summaryClassName += " ContentToggle__Summary--is-open";
    //return (
      //<div {...this.props} className="ContentToggle">
        //<button onClick={this.handleClick} className={summaryClassName}>
          //{this.props.summary}
        //</button>
        //<div className="ContentToggle__Details">
          //{this.state.isOpen && this.props.children}
        //</div>
      //</div>
    //);
  //}
//});

//var App = React.createClass({
  //getInitialState () {
    //return {
      //toggleAll: false,
      //tacos: [
        //{ name: 'Carnitas', src: 'tacos/carnitas.png' },
        //{ name: 'Pollo', src: 'tacos/pollo.png' },
        //{ name: 'Asada', src: 'tacos/asada.png' },
      //]
    //};
  //},

  //toggleAll () {
    //this.setState({
      //toggleAll: !this.state.toggleAll
    //});
  //},

  //render () {
    //return (
      //<div>
        //<button onClick={this.toggleAll}>Toggle All</button>
        //<div>
          //{this.state.tacos.map(taco => (
            //<ContentToggle
              //style={{width: 300}}
              //isOpen={this.state.toggleAll}
              //key={taco.name}
              //summary={taco.name}
            //>
            //<div style={{
              //height: 200,
              //background: `url(${taco.src})`,
              //backgroundSize: 'cover'
            //}}/>
            //</ContentToggle>
          //))}
        //</div>
      //</div>
    //);
  //}
//});

//React.render(<App/>, document.getElementById('app'));

////////////////////////////////////////////////////////////////////////////////
// This is cool, until we screw up the state by clicking toggle all, then
// clicking every item to the other state, and then clicking toggleAll,
// now that the parent owns the toggle state, we need it know each toggler's
// state and synchronize it
//
// - add `isOpen` state to each taco
// - click toggleAll, stuff resets to the initial
// - need to synchronize with onToggle
// - but not toggleAll isn't doing anything

//var ContentToggle = React.createClass({
  //getInitialState () {
    //return {
      //isOpen: this.props.isOpen
    //};
  //},

  //getDefaultProps () {
    //return {
      //isOpen: false
    //};
  //},

  //componentWillReceiveProps (newProps) {
    //if (newProps.isOpen != null)
      //this.setState({ isOpen: newProps.isOpen });
  //},

  //handleClick () {
    //this.setState({ isOpen: !this.state.isOpen }, () => {
      //if (this.props.onToggle) this.props.onToggle(this.state.isOpen);
    //});
  //},

  //render () {
    //var summaryClassName = "ContentToggle__Summary";
    //if (this.state.isOpen)
      //summaryClassName += " ContentToggle__Summary--is-open";
    //return (
      //<div {...this.props} className="ContentToggle">
        //<button onClick={this.handleClick} className={summaryClassName}>
          //{this.props.summary}
        //</button>
        //<div className="ContentToggle__Details">
          //{this.state.isOpen && this.props.children}
        //</div>
      //</div>
    //);
  //}
//});

//var App = React.createClass({
  //getInitialState () {
    //return {
      //toggleAll: false,
      //tacos: [
        //{ name: 'Carnitas', src: 'tacos/carnitas.png', isOpen: true },
        //{ name: 'Pollo', src: 'tacos/pollo.png', isOpen: false },
        //{ name: 'Asada', src: 'tacos/asada.png', isOpen: true },
      //]
    //};
  //},

  //toggleAll () {
    //this.setState({
      //toggleAll: !this.state.toggleAll
    //});
  //},

  //handleToggle (toggledTaco, isOpen) {
    //var newTacos = this.state.tacos.map((taco) => {
      //if (toggledTaco === taco)
        //toggledTaco.isOpen = isOpen;
      //return taco;
    //});
    //this.setState({ tacos: newTacos });
  //},

  //render () {
    //return (
      //<div>
        //<button onClick={this.toggleAll}>Toggle All</button>
        //<div>
          //{this.state.tacos.map(taco => (
            //<ContentToggle
              //style={{width: 300}}
              //onToggle={this.handleToggle.bind(this, taco)}
              //isOpen={taco.isOpen}
              //key={taco.name}
              //summary={taco.name}
            //>
            //<div style={{
              //height: 200,
              //background: `url(${taco.src})`,
              //backgroundSize: 'cover'
            //}}/>
            //</ContentToggle>
          //))}
        //</div>
      //</div>
    //);
  //}
//});

//React.render(<App/>, document.getElementById('app'));

////////////////////////////////////////////////////////////////////////////////
// Now we're ready to make toggleAll smarter by inspecting the individual
// toggler states to decide what to do next

//var ContentToggle = React.createClass({
  //getInitialState () {
    //return {
      //isOpen: this.props.isOpen
    //};
  //},

  //getDefaultProps () {
    //return {
      //isOpen: false
    //};
  //},

  //componentWillReceiveProps (newProps) {
    //if (newProps.isOpen != null)
      //this.setState({ isOpen: newProps.isOpen });
  //},

  //handleClick () {
    //this.setState({ isOpen: !this.state.isOpen }, () => {
      //if (this.props.onToggle) this.props.onToggle(this.state.isOpen);
    //});
  //},

  //render () {
    //var summaryClassName = "ContentToggle__Summary";
    //if (this.state.isOpen)
      //summaryClassName += " ContentToggle__Summary--is-open";
    //return (
      //<div {...this.props} className="ContentToggle">
        //<button onClick={this.handleClick} className={summaryClassName}>
          //{this.props.summary}
        //</button>
        //<div className="ContentToggle__Details">
          //{this.state.isOpen && this.props.children}
        //</div>
      //</div>
    //);
  //}
//});

//var App = React.createClass({
  //getInitialState () {
    //return {
      //toggleAll: false,
      //tacos: [
        //{ name: 'Carnitas', src: 'tacos/carnitas.png', isOpen: true },
        //{ name: 'Pollo', src: 'tacos/pollo.png', isOpen: false },
        //{ name: 'Asada', src: 'tacos/asada.png', isOpen: true },
      //]
    //};
  //},

  //toggleAll () {
    //var allOpen = this.state.tacos.reduce((allOpen, taco) => {
      //return allOpen === false ? allOpen : taco.isOpen;
    //}, true);
    //var allClosed = this.state.tacos.reduce((allClosed, taco) => {
      //return allClosed === false ? allClosed : !taco.isOpen;
    //}, true);
    //var newToggleAll;
    //if (allOpen)
      //newToggleAll = false;
    //else if (allClosed)
      //newToggleAll = true;
    //else
      //newToggleAll = !this.state.toggleAll;
    //var newTacos = this.state.tacos.map((taco) => {
      //taco.isOpen = newToggleAll;
      //return taco;
    //});
    //this.setState({
      //tacos: newTacos,
      //toggleAll: newToggleAll
    //});
  //},

  //handleToggle (toggledTaco, isOpen) {
    //var newTacos = this.state.tacos.map((taco) => {
      //if (toggledTaco === taco)
        //toggledTaco.isOpen = isOpen;
      //return taco;
    //});
    //this.setState({ tacos: newTacos });
  //},

  //render () {
    //return (
      //<div>
        //<button onClick={this.toggleAll}>Toggle All</button>
        //<div>
          //{this.state.tacos.map(taco => (
            //<ContentToggle
              //style={{width: 300}}
              //onToggle={this.handleToggle.bind(this, taco)}
              //isOpen={taco.isOpen}
              //key={taco.name}
              //summary={taco.name}
            //>
            //<div style={{
              //height: 200,
              //background: `url(${taco.src})`,
              //backgroundSize: 'cover'
            //}}/>
            //</ContentToggle>
          //))}
        //</div>
      //</div>
    //);
  //}
//});

//React.render(<App/>, document.getElementById('app'));

////////////////////////////////////////////////////////////////////////////////
// Our state is no fully synchronized, but do we even need state in
// ContentToggle anymore?

var ContentToggle = React.createClass({
  handleClick () {
    if (this.props.onToggle) this.props.onToggle(!this.props.isOpen);
  },

  render () {
    var summaryClassName = "ContentToggle__Summary";
    if (this.props.isOpen)
      summaryClassName += " ContentToggle__Summary--is-open";
    return (
      <div {...this.props} className="ContentToggle">
        <button onClick={this.handleClick} className={summaryClassName}>
          {this.props.summary}
        </button>
        <div className="ContentToggle__Details">
          {this.props.isOpen && this.props.children}
        </div>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState () {
    return {
      toggleAll: false,
      tacos: [
        { name: 'Carnitas', src: 'tacos/carnitas.png', isOpen: true },
        { name: 'Pollo', src: 'tacos/pollo.png', isOpen: false },
        { name: 'Asada', src: 'tacos/asada.png', isOpen: true },
      ]
    };
  },

  toggleAll () {
    var allOpen = this.state.tacos.reduce((allOpen, taco) => {
      return allOpen === false ? allOpen : taco.isOpen;
    }, true);
    var allClosed = this.state.tacos.reduce((allClosed, taco) => {
      return allClosed === false ? allClosed : !taco.isOpen;
    }, true);
    var newToggleAll;
    if (allOpen)
      newToggleAll = false;
    else if (allClosed)
      newToggleAll = true;
    else
      newToggleAll = !this.state.toggleAll;
    var newTacos = this.state.tacos.map((taco) => {
      taco.isOpen = newToggleAll;
      return taco;
    });
    this.setState({
      tacos: newTacos,
      toggleAll: newToggleAll
    });
  },

  handleToggle (toggledTaco, isOpen) {
    var newTacos = this.state.tacos.map((taco) => {
      if (toggledTaco === taco)
        toggledTaco.isOpen = isOpen;
      return taco;
    });
    this.setState({ tacos: newTacos });
  },

  render () {
    return (
      <div>
        <button onClick={this.toggleAll}>Toggle All</button>
        <div>
          {this.state.tacos.map(taco => (
            <ContentToggle
              style={{width: 300}}
              onToggle={this.handleToggle.bind(this, taco)}
              isOpen={taco.isOpen}
              key={taco.name}
              summary={taco.name}
            >
            <div style={{
              height: 200,
              background: `url(${taco.src})`,
              backgroundSize: 'cover'
            }}/>
            </ContentToggle>
          ))}
        </div>
      </div>
    );
  }
});

React.render(<App/>, document.getElementById('app'));

// - We didn't really get rid of state, we just pushed it up a level
// - Must implement `onToggle` :\
// - Must manage state in the owner, always :\
// - got rid of synchronizing state :)
// - component is super simple, just a function of its props
// - No silver bullets, I'd probably go the state synchronization route so
//   that using `ContentToggle` in simple cases doesn't require my app to
//   manage the toggle's state

