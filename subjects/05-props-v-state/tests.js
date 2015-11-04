import React from 'react'
import { Simulate } from 'react-addons-test-utils'
import assert from '../assert'

export default function run(component) {
  var node = React.findDOMNode(component)
  var tabs = node.querySelectorAll('.Tab')

  assert(
    component.refs.tabs.state == null,
    'Tabs should not have state'
  )

  click(tabs[1])
  assert(
    component.getDOMNode().innerHTML.match(/STEP TWO/) != null,
    'clicking changes tabs'
  )

  click(tabs[2])
  assert(
    component.getDOMNode().innerHTML.match(/STEP THREE/) != null,
    'clicking changes tabs'
  )

  click(tabs[0])
  assert(
    component.getDOMNode().innerHTML.match(/STEP ONE/) != null,
    'clicking changes tabs'
  )
}
