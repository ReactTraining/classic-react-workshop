var React = require('react');
var assign = require('object-assign');
var escapeRegExp = require('./utils/escapeRegExp');

var PRODUCTS = [
  {
    category: 'Sporting Goods',
    products: [
      { name: 'Basketball', price: 4000, quantity: 0 },
      { name: 'Boxing Gloves', price: 3500, quantity: 3 },
      { name: 'Baseball', price: 1000, quantity: 0 }
    ]
  },
  {
    category: 'Pets',
    products: [
      { name: 'Gerbil', price: 500, quantity: 0 },
      { name: 'Goldfish', price: 300, quantity: 3 },
      { name: 'Parakeet', price: 2000, quantity: 2 }
    ]
  }
];

var cellStyle = {
  padding: 10
};

var headerCellStyle = assign({}, cellStyle, {
  textAlign: 'left'
});

var PropTypes = {
  product: React.PropTypes.shape({
    name: React.PropTypes.string,
    price: React.PropTypes.number,
    quantity: React.PropTypes.number
  })
};

var CategoryRow = React.createClass({
  propTypes: {
    category: React.PropTypes.string.isRequired
  },
  render() {
    return (
      <tr>
        <th colSpan="2" style={{textAlign: 'left', padding: 10}}>{this.props.category}</th>
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
        <td style={{padding: 10}}>{name}</td>
        <td style={{padding: 10}}>${price/100}</td>
      </tr>
    );
  }
});

var FilterableProductTable = React.createClass({
  propTypes: {
    products: React.PropTypes.arrayOf(PropTypes.product),
    filterBy: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      filterBy: ''
    };
  },
  render() {
    var matcher = new RegExp(escapeRegExp(this.props.filterBy), 'i');

    return (
      <div>
        <h2>{this.props.category}</h2>
        <table>
          <tbody>
            {this.props.products.map((c, i) => [
              <CategoryRow key={i} category={c.category}/>,
              c.products.map((p, i) => (
                matcher.test(p.name) ? <ProductRow key={i} product={p}/> : null
              ))
            ])}
          </tbody>
        </table>
      </div>
    );
  }
});

var ProductCatalog = React.createClass({
  propTypes: {
    products: React.PropTypes.arrayOf(PropTypes.product)
  },
  getInitialState() {
    return {
      searchQuery: ''
    };
  },
  handleQueryChange(event) {
    this.setState({
      searchQuery: event.target.value
    });
  },
  render() {
    return (
      <div>
        <h2>Product Catalog</h2>
        <input type="search" placeholder="search" onChange={this.handleQueryChange} value={this.state.searchQuery}/>
        <br/>
        <div>
          <FilterableProductTable products={this.props.products} filterBy={this.state.searchQuery}/>
        </div>
      </div>
    );
  }
});

React.render(<ProductCatalog products={PRODUCTS}/>, document.getElementById('app'));
