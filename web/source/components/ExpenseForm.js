import React, { PropTypes } from 'react'

import CenterPanel from '../components/CenterPanel'
import { FormControl, Form, ControlLabel, Button, Col ,Modal} from 'react-bootstrap'
import translate from '../lang/language.js'


const ExpenseForm = (props) => {

  if( ! props.expensesTypes.isInit){
    props.syncExpenseTypes()
  }

  let amountInput = null, typeInput = null, dateInput = null, addExpenseTypeInput = null

  // Actual date :  dd/mm/yyyy
  let defaultDateValue = (new Date()).toISOString().substring(0,10)

  function close(){
    props.onValidateModal(false)
  }

  return (
    <CenterPanel>
      <h4 className="main-section">{translate(props.lang, 'ADD_EXPENSE')}</h4>
      <form onSubmit={e => {
        e.preventDefault()
        props.onValidate(parseInt(amountInput.value), typeInput.value, new Date(dateInput.value))
      }}>

        <Form inline>

          <Col md={3}>
            <ControlLabel htmlFor="get-amount">{translate(props.lang, 'AMOUNT')}</ControlLabel><br/>
            <FormControl
              id="get-amount"
              inputRef={ (ref) => amountInput = ref }
              type="number"
            />
          </Col>

          <Col md={3}>
            <ControlLabel htmlFor="get-date">{translate(props.lang, 'DATE')}</ControlLabel><br/>
            <FormControl id="get-date" type="date"
              inputRef={ (ref) => dateInput = ref }
              defaultValue={defaultDateValue}
              style={{width:'100%'}}
               />
          </Col>

          <Col md={3}>

              <ControlLabel htmlFor="get-type">{translate(props.lang, 'TYPE')}</ControlLabel><br/>

            <FormControl componentClass="select"
              inputRef={ (ref) => typeInput = ref } >
              {props.expensesTypes.items.map(expenseType =>
                <option key={expenseType.id} value={expenseType.label}>{expenseType.label}</option>
              )}
            </FormControl>

          </Col>
          <br/>
          <Col md={12} style={{display:'inline-block', textAlign: 'right'}}>
              <Button bsStyle="primary" type="submit">
                {translate(props.lang, 'VALIDATE')}
              </Button>
              <Button bsStyle="primary" style={{marginLeft: '5px'}} onClick={e => {
                e.preventDefault()
                props.onValidateModal(true)
              }}>Update expense type</Button>
          </Col>


        </Form>
      </form>



      <Modal show={props.displayOption.displayModal} onHide={close} >
                <Modal.Header closeButton>
                  <Modal.Title>Expense type management</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{minheight: '150px'}}>
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
                             {translate(props.lang, 'VALIDATE')}
                           </Button>
                       </Col>
                  </Form>

                  {props.expensesTypes.items.map(expenseType =>
                    <div id = {expenseType.id} >
                      {expenseType.label}
                    </div>
                  )}

                </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={e => {
                    e.preventDefault()
                    props.onValidateModal(false)
                  }}> Close</Button>
                </Modal.Footer>
              </Modal>

    </CenterPanel>

  )
}

ExpenseForm.propTypes = {
  expensesTypes : PropTypes.shape({
    items : PropTypes.arrayOf(PropTypes.shape({
      id : PropTypes.number.isRequired,
      label : PropTypes.string.isRequired
    }).isRequired).isRequired,
    isInit : PropTypes.bool.isRequired
  }).isRequired,
  onValidate : PropTypes.func.isRequired,
  syncExpenseTypes : PropTypes.func.isRequired,
  onValidateModal : PropTypes.func.isRequired,
  displayOption : PropTypes.shape({
    displayModal : PropTypes.bool.isRequired
  }),
  lang :PropTypes.string.isRequired
}

export default ExpenseForm
