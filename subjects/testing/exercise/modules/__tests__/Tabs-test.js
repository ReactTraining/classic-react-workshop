import assert from 'assert'
import React from 'react'
import ReactDOM from 'react-dom'
import { Simulate } from 'react-addons-test-utils'
import Tabs from '../Tabs'

describe('when <Tabs> is rendered', function () {
  const FixtureData = [
    { label: 'USA', content: 'Land of the Free, Home of the brave' },
    { label: 'Brazil', content: 'Sunshine, beaches, and Carnival' },
    { label: 'Russia', content: 'World Cup 2018!' }
  ]

  let node, tabs, panel, borderFixture
  beforeEach(function (done) {
    node = document.createElement('div')
    document.body.appendChild(node)

    ReactDOM.render(<Tabs data={FixtureData} />, node, function () {
      tabs = node.querySelectorAll('.Tab')
      panel = node.querySelector('.TabPanel')

      borderFixture = document.createElement('div')
      borderFixture.setAttribute('style', 'border-bottom-color: #000')

      done()
    })
  })

  afterEach(function () {
    ReactDOM.unmountComponentAtNode(node)
    document.body.removeChild(node)
  })

  it('renders the USA tab')

  it('renders the Brazil tab')

  it('renders the Russia tab')

  it('activates the first tab')

  it('does not activate the second tab')

  describe('after clicking the second tab', function () {
    beforeEach(function () {
      // TODO: Simulate a click event on the second tab
    })

    it('activates the second tab')

    it('deactivates the first tab')

    it('puts the correct content in the panel')
  })
})
