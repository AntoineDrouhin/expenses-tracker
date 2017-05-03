import test from 'tape'
import React from 'react'
import { shallow } from 'enzyme'

import { App } from './App'
import CenterPanel from '../components/CenterPanel'
import AddExpense from './AddExpense'
import MonthlyExpenseList from './MonthlyExpenseList'

test('App (container) properly display when called with user', (t) => {
  const props = {
    bHistory: [],
    user: {
      _id: 'fakeid',
      email: 'name@domain.com',
      password: 'password',
      connected: true
    }
  }
  const wrapper = shallow(<App {...props} />)
  t.equal(wrapper.contains(
      <CenterPanel >
        <AddExpense />
        <MonthlyExpenseList />
      </CenterPanel>
    ), true
  )
  t.equal( props.bHistory.length, 0 )
  t.end()
})

test('App (container) redirect to login when callend with no user', (t) => {
  const props = {
    bHistory:[]
  }
  // eslint-disable-next-line
  const wrapper = shallow(<App {...props} />) /*eslint:disable*/
  t.equal( props.bHistory.length, 1 )
  t.end()
})

test('App (container) redirect to login when callend with connected false', (t) => {
  const props = {
    bHistory:[],
    user: {
      _id: 'fakeid',
      email: 'name@domain.com',
      password: 'password',
      connected: false
    }
  }
  // eslint-disable-next-line
  const wrapper = shallow(<App {...props} />) /*eslint:disable*/
  t.equal( props.bHistory.length, 1 )
  t.end()
})
