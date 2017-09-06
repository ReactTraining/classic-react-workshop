/*eslint-env mocha */
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

  it('renders the Brazil tab', () => {
    expect(tabs[1].innerText).toEqual(FixtureData[1].label, 'Brazil tab was not rendered')
  })

  it('renders the Russia tab', () => {
    expect(tabs[2].innerText).toEqual(FixtureData[2].label, 'Russia tab was not rendered')
  })

  it('activates the first tab', () => {
    expect(tabs[0].style.borderBottomColor).toEqual(
      borderFixture.style.borderBottomColor,
      'First tab is not active'
    )
  })

  it('does not activate the second tab', () => {
    expect(tabs[1].style.borderBottomColor).toNotEqual(
      borderFixture.style.borderBottomColor,
      'Second tab is active'
    )
  })

  describe('after clicking the second tab', () => {
    beforeEach(() => {
      Simulate.click(tabs[1])
    })

    it('activates the second tab', () => {
      expect(tabs[1].style.borderBottomColor).toEqual(
        borderFixture.style.borderBottomColor,
        'Second tab is not active'
      )
    })

    it('deactivates the first tab', () => {
      expect(tabs[0].style.borderBottomColor).toNotEqual(
        borderFixture.style.borderBottomColor,
        'First tab is active'
      )
    })

    it('puts the correct content in the panel', () => {
      expect(panel.innerText).toEqual(
        FixtureData[1].content,
        'Correct content is not in the panel'
      )
    })
  })
})
