/*eslint-env mocha */
////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Inside the exercise directory:
//
// - Use `npm install` to install all the app's dependencies
// - Get karma.conf.js to load tests.webpack.js
// - Use `npm start` to start the test server
// - Fill in the test stubs in modules/__tests__ to make the tests pass
////////////////////////////////////////////////////////////////////////////////
import './modules/mocha-setup'
import assert from 'assert'
import React from 'react'
import ReactDOM from 'react-dom'
import { Simulate } from 'react-addons-test-utils'
import Tabs from './modules/Tabs'

describe('when <Tabs> is rendered', () => {
  const FixtureData = [
    { label: 'USA', content: 'Land of the Free, Home of the brave' },
    { label: 'Brazil', content: 'Sunshine, beaches, and Carnival' },
    { label: 'Russia', content: 'World Cup 2018!' }
  ]

  let node, tabs, panel, borderFixture
  beforeEach((done) => {
    node = document.createElement('div')
    document.body.appendChild(node)

    ReactDOM.render(<Tabs data={FixtureData} />, node, () => {
      tabs = node.querySelectorAll('.Tab')
      panel = node.querySelector('.TabPanel')

      borderFixture = document.createElement('div')
      borderFixture.setAttribute('style', 'border-bottom-color: #000')

      done()
    })
  })

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node)
    document.body.removeChild(node)
  })

  it('renders the USA tab', () => {
    assert(tabs[0].innerText === FixtureData[0].label, 'USA tab was rendered')
  })

  it('renders the Brazil tab')

  it('renders the Russia tab')

  it('activates the first tab')

  it('does not activate the second tab')

  describe('after clicking the second tab', () => {
    beforeEach(() => {
      Simulate.click(tabs[1])
    })

    it('activates the second tab')

    it('deactivates the first tab')

    it('puts the correct content in the panel')
  })
})

