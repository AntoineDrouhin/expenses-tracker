import tape from 'tape'
import addAssertions from 'extend-tape'
import jsxEquals from 'tape-jsx-equals'
import React from 'react'
import { createRenderer } from 'react-addons-test-utils'

import CenterPanel from './CenterPanel.js'
import {Panel} from 'react-bootstrap'

const test = addAssertions(tape, { jsxEquals })
const renderer = createRenderer()

test('CenterPanel (component) output if maxWidth left empty', (assert) => {
  renderer.render(<CenterPanel />)

  const message = 'maxWidth is set correctly'
  const expected = <Panel
    style={{
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '950px'
    }} />
  const actual = renderer.getRenderOutput()

  assert.jsxEquals(actual, expected, message)
  assert.end()
})

test('CenterPanel (component) output if maxWidth set', (assert) => {
  renderer.render(<CenterPanel maxWidth="250px"/>)

  const message = 'maxWidth is set correctly'
  const expected = <Panel
    style={{
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '250px'
    }} />
  const actual = renderer.getRenderOutput()

  assert.jsxEquals(actual, expected, message)
  assert.end()
})

test('CenterPanel (component) render inner div ', (assert) => {
  renderer.render(<CenterPanel> <div> </div> </CenterPanel>)

  const message = 'maxWidth render inner div correctly'
  const expected = <Panel
    style={{
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '950px'
    }} > <div> </div> </Panel>
  const actual = renderer.getRenderOutput()

  assert.jsxEquals(actual, expected, message)
  assert.end()
})
