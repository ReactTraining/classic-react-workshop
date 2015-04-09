var React = require('react');
var escapeRegExp = require('./utils/escapeRegExp');

var CATALOG = [
  {
    category: 'Sporting Goods',
    products: [
      { name: 'Basketball', price: 4000 },
      { name: 'Boxing Gloves', price: 3500, inStock: true },
      { name: 'Baseball', price: 1000 }
    ]
  },
  {
    category: 'Pets',
    products: [
      { name: 'Gerbil', price: 500 },
      { name: 'Goldfish', price: 300, inStock: true },
      { name: 'Parakeet', price: 2000, inStock: true }
    ]
  }
];
