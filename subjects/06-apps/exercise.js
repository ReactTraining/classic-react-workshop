var React = require('react');
var assign = require('object-assign');
var escapeRegExp = require('./utils/escapeRegExp');

var CATALOG = [
  {
    categoryName: 'Sporting Goods',
    products: [
      { id: 1, name: 'Basketball', price: 4000, quantity: 0 },
      { id: 2, name: 'Boxing Gloves', price: 3500, quantity: 3 },
      { id: 3, name: 'Baseball', price: 1000, quantity: 0 }
    ]
  },
  {
    categoryName: 'Pets',
    products: [
      { id: 4, name: 'Gerbil', price: 500, quantity: 0 },
      { id: 5, name: 'Goldfish', price: 300, quantity: 3 },
      { id: 6, name: 'Parakeet', price: 2000, quantity: 2 }
    ]
  }
];

var cellStyle = {
  padding: 10
};

var headerCellStyle = assign({}, cellStyle, {
  textAlign: 'left'
});

var CategoryRow = React.createClass({
  render() {
    return (
      <tr>
        <th colSpan="2" style={{textAlign: 'left', padding: 10}}>
          {this.props.productCategory.categoryName}
        </th>
      </tr>
    );
  }
});

var ProductRow = React.createClass({
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
  render() {
    return (
      <p>
        There should be a product table here.
      </p>
    );
  }
});

var ProductCatalog = React.createClass({
  render() {
    return (
      <div>
        <h2>Product Catalog</h2>
        <div>
          <FilterableProductTable/>
        </div>
      </div>
    );
  }
});

React.render(
  <ProductCatalog productCatalog={CATALOG}/>,
  document.getElementById('app')
);
