/*eslint-env mocha */
/*eslint-disable prefer-const */
////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Fill in the test stubs to make the tests pass
////////////////////////////////////////////////////////////////////////////////
import './mocha-setup'

import React from 'react'
import ReactDOM from 'react-dom'
import { Simulate } from 'react-addons-test-utils'
import expect from 'expect'

import Tabs from './components/Tabs'

describe('when <Tabs> is rendered', () => {
  let node, tabs, panel, borderFixture

  const FixtureData = [
    { label: 'USA', content: 'Land of the Free, Home of the brave' },
    { label: 'Brazil', content: 'Sunshine, beaches, and Carnival' },
    { label: 'Russia', content: 'World Cup 2018!' }
  ]

  beforeEach((done) => {
    node = document.createElement('div')
    document.body.appendChild(node)

    ReactDOM.render(<Tabs data={FixtureData}/>, node, () => {
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
    expect(tabs[0].innerText).toEqual(FixtureData[0].label, 'USA tab was not rendered')
  })

  it('renders the Brazil tab')

  it('renders the Russia tab')

  // you may want to use the `borderFixture` variable
  it('activates the first tab')

  it('does not activate the second tab')

  describe('after clicking the second tab', () => {
    beforeEach(() => {
      // TODO: simulate a click on the second tab
    })

    it('activates the second tab')

    it('deactivates the first tab')

    it('puts the correct content in the panel')
  })
})
