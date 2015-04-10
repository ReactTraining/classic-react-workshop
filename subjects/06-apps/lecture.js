var React = require('react');
var assign = require('object-assign');
var escapeRegExp = require('./utils/escapeRegExp');

var CATALOG = [
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
    price: React.PropTypes.number
  })
};

PropTypes.category = React.PropTypes.shape({
  category: React.PropTypes.string,
  products: React.PropTypes.arrayOf(PropTypes.product)
});

var ProductRow = React.createClass({
  propTypes: {
    product: PropTypes.product
  },
  render() {
    var { name, price } = this.props.product;

    return (
      <tr>
        <td style={cellStyle}>{name}</td>
        <td style={cellStyle}>${price/100}</td>
      </tr>
    );
  }
});

var CategoryRow = React.createClass({
  render() {
    return (
      <tr>
        <th colSpan="2" style={headerCellStyle}>{this.props.children}</th>
      </tr>
    );
  }
});

var escapeRegExp = require('./utils/escapeRegExp');

var ProductTable = React.createClass({
  propTypes: {
    categories: React.PropTypes.arrayOf(PropTypes.category)
  },
  getInitialState() {
    return {
      searchQuery: '',
      showOnlyInStock: false
    };
  },
  handleChange(event) {
    this.setState({
      searchQuery: event.target.value
    });
  },
  handleShowInStockChange(event) {
    this.setState({
      showOnlyInStock: event.target.checked
    });
  },
  render() {
    var matcher = new RegExp('^' + escapeRegExp(this.state.searchQuery), 'i');
    var showOnlyInStock = this.state.showOnlyInStock;

    var categories = this.props.categories.map(function (c) {
      return {
        category: c.category,
        products: c.products.filter(function (p) {
          return matcher.test(p.name) && (showOnlyInStock ? p.quantity > 0 : true);
        })
      };
    }).filter(function (c) {
      return c.products.length !== 0;
    });

    return (
      <div>
        <input type="search" placeholder="search" onChange={this.handleChange} value={this.state.searchQuery}/>
        <br/>
        <label>
          <input type="checkbox" onChange={this.handleShowInStockChange} value={this.state.showOnlyInStock}/>
          Show only in stock
        </label>
        <table>
          <tbody>
            {categories.map(c => [
              <CategoryRow>
                <strong>{c.category}</strong>
              </CategoryRow>,
              c.products.map(product => (
                <ProductRow key={product.name} product={product}/>
              ))
            ])}
          </tbody>
        </table>
      </div>
    );
  }
});

React.render(<ProductTable categories={CATALOG}/>, document.getElementById('app'));




























// var PropTypes = {
//   product: React.PropTypes.shape({
//     name: React.PropTypes.string.isRequired,
//     price: React.PropTypes.number.isRequired,
//     inStock: React.PropTypes.bool
//   })
// };
//
// var FilterableProductTable = React.createClass({
//   propTypes: {
//     filterBy: React.PropTypes.string,
//     category: React.PropTypes.string,
//     products: React.PropTypes.arrayOf(PropTypes.product)
//   },
//   getDefaultProps() {
//     return {
//       filterBy: ''
//     };
//   },
//   render() {
//     var matcher = new RegExp(escapeRegExp(this.props.filterBy), 'i');
//
//     return (
//       <div>
//         <h2>{this.props.category}</h2>
//         <table>
//           <tbody>
//             {CATALOG.map((c, i) => [
//               <CategoryRow key={i} category={c.category}/>,
//               c.products.map((p, i) => (
//                 matcher.test(p.name) ? <ProductRow key={i} product={p}/> : null
//               ))
//             ])}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// });
//
// var CategoryRow = React.createClass({
//   propTypes: {
//     category: React.PropTypes.string.isRequired
//   },
//   render() {
//     return (
//       <tr>
//         <th colSpan="2" style={{textAlign: 'left', padding: 10}}>{this.props.category}</th>
//       </tr>
//     );
//   }
// });
//
// var ProductRow = React.createClass({
//   propTypes: {
//     product: PropTypes.product
//   },
//   render() {
//     var { name, price } = this.props.product;
//
//     return (
//       <tr>
//         <td style={{padding: 10}}>{name}</td>
//         <td style={{padding: 10}}>${price/100}</td>
//       </tr>
//     );
//   }
// });
//
// var App = React.createClass({
//   getInitialState() {
//     return {
//       searchQuery: ''
//     };
//   },
//   handleQueryChange(event) {
//     this.setState({
//       searchQuery: event.target.value
//     });
//   },
//   render() {
//     return (
//       <div>
//         <input type="search" placeholder="search" onChange={this.handleQueryChange} value={this.state.searchQuery}/>
//         <br/>
//         <div>
//           <FilterableProductTable filterBy={this.state.searchQuery}/>
//         </div>
//       </div>
//     );
//   }
// });

// React.render(<App/>, document.getElementById('app'));
