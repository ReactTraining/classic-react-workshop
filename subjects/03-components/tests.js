import React from 'react'
import { findDOMNode } from 'react-dom'
import { Simulate } from 'react-addons-test-utils'
import assert from '../assert'

export default function run() {
  const node = document.getElementById('app')
  const html = node.innerHTML
  const tabs = node.querySelectorAll('.Tab')
  const panels = node.querySelector('.TabPanels')

  const borderFixture = document.createElement('div')
  borderFixture.setAttribute('style', 'border-bottom-color: #000')

  console.log('on first render')
  assert(!!html.match(/USA/), 'render USA tab')
  assert(!!html.match(/Brazil/), 'render Brazil tab')
  assert(!!html.match(/Russia/), 'render Russia tab')
  assert(
    tabs[0].style.borderBottomColor === borderFixture.style.borderBottomColor,
    'first tab is active'
  )
  assert(
    tabs[1].style.borderBottomColor !== borderFixture.style.borderBottomColor,
    'second tab is inactive'
  )

  console.log('after clicking the third tab...')
  Simulate.click(tabs[2])
  assert(
    tabs[2].style.borderBottomColor === borderFixture.style.borderBottomColor,
    'third tab is active'
  )
  assert(
    tabs[0].style.borderBottomColor !== borderFixture.style.borderBottomColor,
    'first tab is inactive'
  )
  assert(
    panels.textContent.trim() == 'World Cup 2018!',
    'you have the wrong content in the panel'
  )
  Simulate.click(tabs[0])
}
