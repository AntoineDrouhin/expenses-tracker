import test from 'tape'
import user from  './user.js'

test( 'user (reducer) info is SET properly', (assert) => {
  const actual = user(
    {},
    {
      type: 'SET_USER',
      _id: 'abc',
      email: 'abc@yogourt.com',
      password: 'abc',
      connected: true,
      error: false
    }
  )
  const expected = {
    _id: 'abc',
    email: 'abc@yogourt.com',
    password: 'abc',
    connected: true,
    error: false
  }
  assert.deepEqual( actual, expected )
  assert.end()
})
