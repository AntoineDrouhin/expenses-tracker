import React, { PropTypes } from 'react'
import CenterPanel from '../components/CenterPanel'
import { FormControl, Form, ControlLabel, Button, Col} from 'react-bootstrap'
import translate from '../lang/language.js'

const ExpenseForm = (props) => {

  let amountInput = null, typeInput = null, dateInput = null

  // Actual date :  dd/mm/yyyy
  let defaultDateValue = (new Date()).toISOString().substring(0,10)

  return (
    <CenterPanel>
      <h4>{translate(props.lang, 'ADD_EXPENSE')}</h4>
      <form onSubmit={e => {
        e.preventDefault()
        props.onValidate(parseInt(amountInput.value), typeInput.value, new Date(dateInput.value))
      }}>

        <Form inline>

          <Col md={3}>
            <ControlLabel htmlFor="get-amount">{translate(props.lang, 'AMOUNT')} :</ControlLabel>
            <FormControl
              id="get-amount"
              inputRef={ (ref) => amountInput = ref }
              type="number" />
          </Col>

          <Col md={3}>
            <ControlLabel htmlFor="get-date">{translate(props.lang, 'DATE')} :</ControlLabel>
            <FormControl id="get-date" type="date"
              inputRef={ (ref) => dateInput = ref }
              defaultValue={defaultDateValue} />
          </Col>

          <Col md={3}>
            <Col md={12}>
              <ControlLabel htmlFor="get-type">{translate(props.lang, 'TYPE')} :</ControlLabel>
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
                {translate(props.lang, 'VALIDATE')}
              </Button>
          </Col>

        </Form>
      </form>
    </CenterPanel>
  )
}

ExpenseForm.propTypes = {
  expensesTypes : PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onValidate : PropTypes.func.isRequired,
  lang :PropTypes.string.isRequired
}

export default ExpenseForm
