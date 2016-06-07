/*eslint-disable no-console */
import { findDOMNode } from 'react-dom'
import { Simulate } from 'react-addons-test-utils'
import assert from '../assert'

export function run(component) {
  const node = findDOMNode(component)
  const html = node.innerHTML
  const tabs = node.querySelectorAll('.Tab')
  const panel = node.querySelector('.TabPanel')

  const borderFixture = document.createElement('div')
  borderFixture.setAttribute('style', 'border-bottom-color: #000')

  console.log('on first render')
  assert(!!html.match(/USA/), 'render USA tab')
  assert(!!html.match(/Brazil/), 'render Brazil tab')
  assert(!!html.match(/Russia/), 'render Russia tab')
  assert(
    tabs[0] && tabs[0].style.borderBottomColor === borderFixture.style.borderBottomColor,
    'first tab is active'
  )
  assert(
    tabs[1] && tabs[1].style.borderBottomColor !== borderFixture.style.borderBottomColor,
    'second tab is inactive'
  )

  console.log('after clicking the second tab...')
  Simulate.click(tabs[1])
  assert(
    tabs[1] && tabs[1].style.borderBottomColor === borderFixture.style.borderBottomColor,
    'second tab is active'
  )
  assert(
    tabs[0] && tabs[0].style.borderBottomColor !== borderFixture.style.borderBottomColor,
    'first tab is inactive'
  )
  assert(
    panel.textContent.trim() === 'Sunshine, beaches, and Carnival',
    'panel has the correct content'
  )

  Simulate.click(tabs[0])
}
