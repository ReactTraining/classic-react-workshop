import './mocha-setup'

import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { Simulate } from 'react-addons-test-utils'
import expect from 'expect'

import ContentToggle from './components/ContentToggle'
import StatefulContentToggle from './components/StatefulContentToggle'
import Tabs from './components/Tabs'
import Droppable from './components/Droppable'
import ContactList from '../Flux/solution/components/ContactList'

// describe('ContentToggle', () => {
//   let div
//   beforeEach(() => div = document.createElement('div'))
//
//   it('displays the summary', () => {
//     ReactDOM.render(<ContentToggle summary="test"/>, div)
//     expect(div.innerHTML).toMatch(/test/, '"test" was not found in HTML')
//   })
//
//   describe('isOpen prop', () => {
//     it('does not display children when false', () => {
//       ReactDOM.render((
//         <ContentToggle isOpen={false} summary="">
//           <p>Cheers</p>
//         </ContentToggle>
//       ), div)
//
//       expect(div.innerHTML).toNotMatch(/Cheers/, '"Cheers" was found in HTML')
//     })
//
//     it('defaults to false', () => {
//       ReactDOM.render((
//         <ContentToggle summary="">
//           <p>Cheers</p>
//         </ContentToggle>
//       ), div)
//
//       expect(div.innerHTML).toNotMatch(/Cheers/, '"Cheers" was found in HTML')
//     })
//
//     it('displays children when true', () => {
//       ReactDOM.render((
//         <ContentToggle isOpen={true} summary="">
//           <p>Cheers</p>
//         </ContentToggle>
//       ), div)
//
//       expect(div.innerHTML).toMatch(/Cheers/, '"Cheers" was not found in HTML')
//     })
//   })
// })

// describe('StatefulContentToggle', () => {
//   let div
//   beforeEach(() => div = document.createElement('div'))
//
//   it('opens when clicked', () => {
//     ReactDOM.render((
//       <StatefulContentToggle summary="test">
//         children
//       </StatefulContentToggle>
//     ), div)
//     Simulate.click(div.querySelector('button'))
//     expect(div.innerHTML).toMatch(/children/, '"children" was not found in HTML')
//   })
// })

// describe('Droppable', () => {
//   let div
//   beforeEach(() => {
//     div = document.createElement('div')
//     document.body.appendChild(div)
//   })
//
//   afterEach(() => document.body.removeChild(div))
//
//   it('accepts files', () => {
//     ReactDOM.render(<Droppable/>, div)
//     Simulate.dragOver(div.querySelector('div.Droppable'), {
//       dataTransfer: { types: ['Files'] }
//     })
//     expect(div.innerHTML).toMatch(/Drop it!/, '"Drop it!" was not found in HTML')
//   })
// })

// describe('ContactList', () => {
//   let ActionStub, StoreStub, div
//
//   beforeEach(() => {
//     div = document.createElement('div')
//     ActionStub = { loadContacts(){}, deleteContact(){} }
//     StoreStub = { getState(){}, removeChangeListener(){}, addChangeListener(){} }
//   })
//
//   it('loads contacts when mounted', () => {
//     const loadContacts = expect.spyOn(ActionStub, 'loadContacts')
//
//     ReactDOM.render(<ContactList
//       ViewActions={ActionStub}
//       StoreStub={StoreStub}
//     />, div)
//
//     expect(loadContacts).toHaveBeenCalled()
//   })
// })

// - render to a node that isn't in the dom
// - match innerHTML
// - renderToString
// - Simulate
// - actually render something
// - getDefaultProps for application modules
// - shallow renderer
// - assert on vdom
