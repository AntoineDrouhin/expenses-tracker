import React, { PropTypes } from 'react'
import { FormControl, Form, ControlLabel, Button,
  Col, Panel} from 'react-bootstrap'

const ExpenseForm = (props) => {

  let amountInput = null, typeInput = null, dateInput = null, addExpenseTypeInput = null

  // Actual date :  dd/mm/yyyy
  let defaultDateValue = (new Date()).toISOString().substring(0,10)

  return (
    <Panel>
      <h4>Add an expense</h4>
      <form onSubmit={e => {
        e.preventDefault()
        props.onValidate(parseInt(amountInput.value), typeInput.value, new Date(dateInput.value))
      }}>

        <Form inline>

          <Col md={3}>
            <ControlLabel htmlFor="get-amount">Amount :</ControlLabel>
            <FormControl
              id="get-amount"
              inputRef={ (ref) => amountInput = ref }
              type="number" />
          </Col>

          <Col md={3}>
            <ControlLabel htmlFor="get-date">Date :</ControlLabel>
            <FormControl id="get-date" type="date"
              inputRef={ (ref) => dateInput = ref }
              defaultValue={defaultDateValue} />
          </Col>

          <Col md={3}>
            <Col md={12}>
              <ControlLabel htmlFor="get-type">Type :</ControlLabel>
            </Col>
            <Col md={12}>
            <FormControl componentClass="select"
              inputRef={ (ref) => typeInput = ref } >
              {props.expensesTypes.map(expenseType =>
                <option key={expenseType.id} value={expenseType.label}>{expenseType.label}</option>
              )}
            </FormControl>
            </Col>
          </Col>

          <Col md={3}>
              <Button bsStyle="primary" type="submit">
                Validate
              </Button>
          </Col>

        </Form>
      </form>

      <form onSubmit={e => {
        e.preventDefault()
        props.onValidateType(addExpenseTypeInput.value)
      }}>
        <Form inline>
          <Col md={4}>
            <FormControl id="get-expenseType" type="text"
              inputRef={ (ref) => addExpenseTypeInput = ref }
             />
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
    _id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onValidate : PropTypes.func.isRequired
}

export default ExpenseForm
