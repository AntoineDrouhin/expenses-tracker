import React, { PropTypes } from 'react'
import TypeSelector from './TypeSelector'
import { FormControl, Form, ControlLabel, Button, Col, Panel} from 'react-bootstrap'

const ExpenseForm = (props) => {
  let amount, type, date

  return (
    <Panel>
      <h4>Add an expense</h4>
      <form onSubmit={e => {
        e.preventDefault()
        props.onValidate(parseInt(amount.value), 'Food')
      }}>

        <Form inline>

          <Col md={3}>
            <ControlLabel htmlFor="get-amount">Amount :</ControlLabel>
            <FormControl
              type="text"
              id="get-amount"
              ref={node => amount = node }
              type="number" />
          </Col>

          <Col md={3}>
            <ControlLabel htmlFor="get-date">Date :</ControlLabel>
            <FormControl id="get-date" type="date"></FormControl>
          </Col>

          <Col md={3}>
            <Col md={12}>
              <ControlLabel htmlFor="get-type">Type :</ControlLabel>
            </Col>
            <Col md={12}>
              <TypeSelector expensesTypes={props.expensesTypes}/>
            </Col>
          </Col>

          <Col md={3}>
              <Button bsStyle="primary" type="submit">
                Validate
              </Button>
          </Col>

        </Form>
      </form>
    </Panel>
  )
}

ExpenseForm.propTypes = {
  expensesTypes : PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onValidate : PropTypes.func.isRequired
}

export default ExpenseForm
