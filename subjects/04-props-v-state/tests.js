import { findDOMNode } from 'react-dom'
import { Simulate } from 'react-addons-test-utils'
import assert from '../assert'

export function run(component) {
  const node = findDOMNode(component)
  const tabs = node.querySelectorAll('.Tab')

  assert(
    component.refs.tabs.state == null,
    'Tabs should not have state'
  )

  Simulate.click(tabs[1])
  assert(
    node.innerHTML.match(/STEP TWO/) != null,
    'clicking changes tabs'
  )

  Simulate.click(tabs[2])
  assert(
    node.innerHTML.match(/STEP THREE/) != null,
    'clicking changes tabs'
  )

  Simulate.click(tabs[0])
  assert(
    node.innerHTML.match(/STEP ONE/) != null,
    'clicking changes tabs'
  )
}
