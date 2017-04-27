import test from 'tape'
import React from 'react'
import { shallow } from 'enzyme'

import ExpenseList from './ExpenseList'
import TotalExpense from './TotalExpense'

test('ExpenseList (component) contain a totalExpense component', t => {

  const props =   { expenses : [
    {
      _id: '1',
      date: Date.now().toString(),
      expenseType: 'Food',
      amount: 34
    },
    {
      _id: '2',
      date: Date.now().toString(),
      expenseType: 'Clothes',
      amount: 6
    }
  ],
    onDeleteClick: () => 1
  }

  const wrapper = shallow(<ExpenseList {...props} />)
  t.equal(wrapper.contains(<TotalExpense totalAmount={40}/> ), true)
  t.end()
})

test('ExpenseList (component) properly sum expenses amount', t => {

  const props =   { expenses : [
    {
      _id: '1',
      date: Date.now().toString(),
      expenseType: 'Food',
      amount: 120
    },
    {
      _id: '2',
      date: Date.now().toString(),
      expenseType: 'Clothes',
      amount: 50
    },
    {
      _id: '3',
      date: Date.now().toString(),
      expenseType: 'Medication',
      amount: 25
    }
  ],
    onDeleteClick: () => 1
  }

  const wrapper = shallow(<ExpenseList {...props} />)
  t.equal(wrapper.contains(<TotalExpense totalAmount={195} /> ), true)
  t.end()
})
