import './modules/mocha-setup'
import React from 'react'
import { render } from 'react-dom'
import { renderToString } from 'react-dom/server'
import { Simulate } from 'react-addons-test-utils'
import assert from 'assert'
import Tabs from './modules/Tabs'
import ContentToggle from './modules/ContentToggle'
import Droppable from './modules/Droppable'
import StatefulContentToggle from './modules/StatefulContentToggle'
import ContactList from '../flux/solution/components/ContactList'

//describe('ContentToggle', () => {
  //const div = document.createElement('div')

  //beforeEach(() => div.innerHTML = '')

  //it('displays the summary', () => {
    //render(<ContentToggle summary="test"/>, div)
    //assert(!!div.innerHTML.match(/test/), '"test" found in html')
  //})

  //describe('isOpen prop', () => {
    //it('does not display children when false', () => {
      //const div = document.createElement('div')
      //render((
        //<ContentToggle isOpen={false} summary="">
          //<p>Cheers</p>
        //</ContentToggle>
      //), div)
      //assert(!div.innerHTML.match(/Cheers/), '"Cheers" not found in html')
    //})

    //it('defaults to false', () => {
      //const div = document.createElement('div')
      //render((
        //<ContentToggle summary="">
          //<p>Cheers</p>
        //</ContentToggle>
      //), div)
      //assert(!div.innerHTML.match(/Cheers/), '"Cheers" not found in html')
    //})

    //it('displays children when true', () => {
      //const div = document.createElement('div')
      //render((
        //<ContentToggle isOpen={true} summary="">
          //<p>Cheers</p>
        //</ContentToggle>
      //), div)
      //assert(!!div.innerHTML.match(/Cheers/), '"Cheers" found in html')
    //})
  //})
//})

//describe('StatefulContentToggle', () => {
  //const div = document.createElement('div')

  //beforeEach(() => div.innerHTML = '')

  //it('opens when clicked', () => {
    //render((
      //<StatefulContentToggle summary="test">
        //children
      //</StatefulContentToggle>
    //), div)
    //Simulate.click(div.querySelector('button'))
    //assert(!!div.innerHTML.match(/children/), '"children" found in html')
  //})
//})

//describe('Droppable', () => {
  //let div

  //beforeEach(() => {
    //div = document.createElement('div')
    //document.body.appendChild(div)
  //})

  ////afterEach(() => document.body.removeChild(div))

  //it('accepts files', () => {
    //render(<Droppable/>, div)
    //Simulate.dragOver(div.querySelector('div.Droppable'), {
      //dataTransfer: { types: ['Files'] }
    //})
    //assert(!!div.innerHTML.match(/Drop it!/), '"Drop it!" found')
  //})
//})

//describe('ContactList', () => {
  //let ActionStub, StoreStub, div

  //beforeEach(() => {
    //div = document.createElement('div')
    //ActionStub = { loadContacts(){}, deleteContact(){} }
    //StoreStub = { getState(){}, removeChangeListener(){}, addChangeListener(){} }
  //})

  //it('loads contacts when mounted', (done) => {
    //ActionStub.loadContacts = () => {
      //assert(true, 'loadContacts called')
      //done()
    //}
    //render(<ContactList
      //ViewActions={ActionStub}
      //StoreStub={StoreStub}
    ///>, div)
  //})
//})

//- render to a node that isn't in the dom
//- match innerHTML
//- renderToString
//- Simulate
//- actually render something
//- getDefaultProps for application modules
//- shallow renderer
//- assert on vdom
