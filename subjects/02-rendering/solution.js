var React = require('react');
var sortBy = require('sort-by');

var DATA = {
  title: 'Menu',
  items: [
    { id: 1, name: 'tacos', type: 'mexican' },
    { id: 2, name: 'burrito', type: 'mexican' },
    { id: 3, name: 'tostada', type: 'mexican' },
    { id: 4, name: 'hush puppies', type: 'southern' }
  ]
};

function tranformItems() {
  return DATA.items.filter((item) => {
    return item.type === 'mexican';
  }).sort(sortBy('name'));
}

function render() {
  return (
    <div>
      <h1>{DATA.title}</h1>
      <ul>
        {tranformItems().map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

React.render(render(), document.getElementById('app'), function () {
  require('./tests').run(this);
});
