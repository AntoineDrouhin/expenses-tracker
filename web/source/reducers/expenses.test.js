import test from 'tape'
import expenses from  '../../source/reducers/expenses'

test( 'Expense (reducer) delete expenses from empty array', (assert) => {
  const msg = 'expenses are deleted correctly'
  const actual = expenses([], {type: 'DELETE_EXPENSE', id: 3})
  const expected = []
  assert.deepEqual( actual, expected, msg )
  assert.end()
})
