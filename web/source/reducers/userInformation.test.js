import test from 'tape'
import userInformation from  './userInformation.js'

test( 'userInformation (reducer) info is SET properly', (assert) => {
  const actual = userInformation(
    {},
    {
      type: 'SET_USERINFORMATION',
      _id: 'abc',
      email: 'abc@yogourt.com',
      password: 'abc',
      connectionStatus: true
    }
  )
  const expected = {
    _id: 'abc',
    email: 'abc@yogourt.com',
    password: 'abc',
    connectionStatus: true
  }
  assert.deepEqual( actual, expected )
  assert.end()
})
