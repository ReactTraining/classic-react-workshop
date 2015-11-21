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

  it('renders the USA tab', function () {
    assert(tabs[0].innerText === FixtureData[0].label, 'USA tab was rendered')
  })

  it('renders the Brazil tab', function () {
    assert(tabs[1].innerText === FixtureData[1].label, 'Brazil tab was rendered')
  })

  it('renders the Russia tab', function () {
    assert(tabs[2].innerText === FixtureData[2].label, 'Russia tab was rendered')
  })

  it('activates the first tab', function () {
    assert(
      tabs[0].style.borderBottomColor === borderFixture.style.borderBottomColor,
      'the first tab is active'
    )
  })

  it('does not activate the second tab', function () {
    assert(
      tabs[1].style.borderBottomColor !== borderFixture.style.borderBottomColor,
      'the second tab is not active'
    )
  })

  describe('after clicking the second tab', function () {
    beforeEach(function () {
      Simulate.click(tabs[1])
    })

    it('activates the second tab', function () {
      assert(
        tabs[1].style.borderBottomColor === borderFixture.style.borderBottomColor,
        'the second tab is active'
      )
    })

    it('deactivates the first tab', function () {
      assert(
        tabs[0].style.borderBottomColor !== borderFixture.style.borderBottomColor,
        'the first tab is inactive'
      )
    })

    it('puts the correct content in the panel', function () {
      assert(
        panel.innerText === FixtureData[1].content,
        'the correct content is in the panel'
      )
    })
  })
})
