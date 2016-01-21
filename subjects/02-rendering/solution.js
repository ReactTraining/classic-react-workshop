////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - render DATA.title in an <h1>
// - render a <ul> with each of DATA.items as an <li>
// - now only render an <li> for mexican food (hint: use DATA.items.filter(...))
// - sort the items in alphabetical order by name (hint: use sort-by https://github.com/staygrimm/sort-by#example)
//
// Got extra time?
// - add a select dropdown to make filtering on `type` dynamic
// - add a button to toggle the sort order
// - Hint: you'll need an `updateThePage` function that calls `render`,
//   and then you'll need to call it in the event handlers of the form controls
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import sortBy from 'sort-by'

let foodType = 'mexican'
let sortOrder = 'descending'

function handleChange(event) {
  foodType = event.target.value
  updateThePage()
}

function changeSort(order) {
  sortOrder = order
  updateThePage()
}

function Menu({ data }) {
  const items = data.items
    .filter(item => item.type === foodType)
    .sort(sortBy(sortOrder === 'ascending' ? 'name' : '-name'))
    .map(item => (
      <li key={item.id}>{item.name}</li>
    ))

  return (
    <div>
      <h1>{data.title}</h1>
      {sortOrder === 'ascending' ?
        <button onClick={() => changeSort('descending')}>sort descending</button> :
        <button onClick={() => changeSort('ascending')}>sort ascending</button>
      }
      <select onChange={handleChange}>
        <option>mexican</option>
        <option>english</option>
      </select>
      <ul>
        {items}
      </ul>
    </div>
  )
}

const DATA = {
  title: 'Menu',
  items: [
    { id: 1, name: 'tacos', type: 'mexican' },
    { id: 2, name: 'burrito', type: 'mexican' },
    { id: 3, name: 'tostada', type: 'mexican' },
    { id: 4, name: 'mushy peas', type: 'english' },
    { id: 5, name: 'fish and chips', type: 'english' },
    { id: 6, name: 'black pudding', type: 'english' }
  ]
}

function updateThePage() {
  render(<Menu data={DATA}/>, document.getElementById('app'), function () {
    require('./tests').run()
  })
}

updateThePage()
