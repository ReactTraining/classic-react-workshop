var React = require('react');

var PropTypes = {
  product: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired,
    inStock: React.PropTypes.bool
  })
};

var ProductTable = React.createClass({
  propTypes: {
    category: React.PropTypes.string,
    products: React.PropTypes.arrayOf(PropTypes.product)
  },
  render() {
    return (
      <div>
        <h2>{this.props.category}</h2>
        <table>
          <thead>
            
          </thead>
          <tbody>
            {this.props.products.map((p, i) => <ProductRow key={i} product={p}/>)}
          </tbody>
        </table>
      </div>
    );
  }
});

var CategoryRow = React.createClass({
  propTypes: {
    category: React.PropTypes.string.isRequired
  },
  render() {
    return (
      <tr>
        <th colspan="2">{this.props.category}</th>
      </tr>
    );
  }
});

var ProductRow = React.createClass({
  propTypes: {
    product: PropTypes.product
  },
  render() {
    var { name, price } = this.props.product;

    return (
      <tr>
        <td>{name}</td>
        <td>${price/100}</td>
      </tr>
    );
  }
});

var CATALOG = [
  {
    category: 'Sporting Goods',
    products: [
      { name: 'Basketball', price: 4000 },
      { name: 'Boxing Gloves', price: 3500 },
      { name: 'Baseball', price: 1000 }
    ]
  },
  {
    category: 'Pets',
    products: [
      { name: 'Gerbil', price: 500 },
      { name: 'Goldfish', price: 300 },
      { name: 'Parakeet', price: 2000 }
    ]
  }
];

var App = React.createClass({
  getInitialState() {
    return {
      searchQuery: '',
      onlyShowInStock: false
    };
  },
  handleQueryChange(event) {
    this.setState({
      searchQuery: event.target.value
    });
  },
  handleInStockFilterChange(event) {
    this.setState({
      onlyShowInStock: event.target.checked
    });
  },
  render() {
    return (
      <div>
        <input ref="search" type="text" onChange={this.handleQueryChange} value={this.state.searchQuery}/>
        <input ref="inStock" type="checkbox" onChange={this.handleInStockFilterChange} value={this.state.onlyShowInStock}/> Only show in stock
        <div>
          {CATALOG.map((props, i) => <ProductTable key={i} {...props}/>)}
        </div>
      </div>
    );
  }
});

React.render(<App/>, document.getElementById('app'));
