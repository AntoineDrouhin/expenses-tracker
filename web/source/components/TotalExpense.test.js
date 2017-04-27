import test from 'tape'
import React from 'react'
import { shallow } from 'enzyme'

import { Label } from 'react-bootstrap'
import TotalExpense from './TotalExpense'


test('TotalExpense (component) contains 2 col item ', t => {
  const wrapper = shallow(<TotalExpense totalAmount={2}/>)
  t.equal(wrapper.find('Col').length, 2)
  t.end()
})

test('TotalExpense (component) 1st Col elem has a son h3 containing "Total expense :"', t => {
  const wrapper = shallow(<TotalExpense totalAmount={0}/>)
  t.equal(wrapper.contains(<h3 >Total expense :</h3>), true)
  t.end()
})

test('TotalExpense (component) render the total expense properly', t => {
  const wrapper = shallow(<TotalExpense totalAmount={2}/>)
  t.equal(wrapper.contains(<h2><Label bsStyle="info">{2}</Label ></h2>), true)
  t.end()
})

//
// test('the 2nd Col has a h3 son containing the amound passed in props', t => {
//   const totalAmount = 2
//   const wrapper = shallow(<TotalExpense totalAmount={totalAmount}/>)
//   t.equal(wrapper.contains(<h3 >{totalAmount}</h3>), true)
//   t.end()
// })




//Behavior to test :
// the component has a 1st Col element with the style md=3 et mdOffset=6
// The 1st Col elem has a son h3 containing "Total expense : "
// the component has a 2nd Col element with the style md=3
// the 2nd Col has a h3 son containing the amound passed in props
