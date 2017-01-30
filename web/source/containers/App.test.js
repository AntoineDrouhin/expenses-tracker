import test from 'tape'
import React from 'react'
import { shallow } from 'enzyme'

import { App } from './App'
import CenterPanel from '../components/CenterPanel'
import AddExpense from './AddExpense'
import MonthlyExpenseList from './MonthlyExpenseList'

test('App (container) properly display when called with userInformation', (t) => {
  const props = {
    bHistory: [],
    userInformation: {
      email: 'name@domain.com',
      password: 'password',
      connectionStatus: true
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

test('App (container) redirect to login when callend with no userInformation', (t) => {
  const props = {
    bHistory:[]
  }
  // eslint-disable-next-line
  const wrapper = shallow(<App {...props} />) /*eslint:disable*/
  t.equal( props.bHistory.length, 1 )
  t.end()
})

test('App (container) redirect to login when callend with connectionStatus false', (t) => {
  const props = {
    bHistory:[],
    userInformation: {
      email: 'name@domain.com',
      password: 'password',
      connectionStatus: false
    }
  }
  // eslint-disable-next-line
  const wrapper = shallow(<App {...props} />) /*eslint:disable*/
  t.equal( props.bHistory.length, 1 )
  t.end()
})
