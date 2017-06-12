import React, { PropTypes } from 'react'

import CenterPanel from '../components/CenterPanel'

import { FormControl, Form, ControlLabel, Button,
  Col,Modal,Glyphicon,FormGroup} from 'react-bootstrap'

import translate from '../lang/language.js'


const ExpenseForm = (props) => {

  if( ! props.expenseTypes.isInit){
    props.syncExpenseTypes()
  }

  let amountInput = null, typeInput = null, dateInput = null, addExpenseTypeInput = null
  let amountValState = 'null'
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
        if(amountInput.value != '' && !isNaN(amountInput.value)) {
          amountValState = null
          props.onValidate(parseInt(amountInput.value), typeInput.value, new Date(dateInput.value))
        }
        else {
          amountValState = 'error'
        }
      }}>
        <Form inline>

          <Col md={3}>
          <FormGroup validationState={amountValState}>
            <ControlLabel htmlFor="get-amount">{translate(props.lang, 'AMOUNT')}</ControlLabel><br/>
            <FormControl
              id="get-amount"
              inputRef={ (ref) => amountInput = ref }
              type="number"
            />
             </FormGroup>
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
              {props.expenseTypes.items.map(expenseType =>
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
              }}>{translate(props.lang, 'NEW_EXPENSE_TYPE')}</Button>
          </Col>


        </Form>
      </form>



      <Modal show={props.displayOption.displayModal} onHide={close} >
                <Modal.Header closeButton>
                  <Modal.Title>{translate(props.lang, 'ADD_EXPENSE_TYPE')}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{minheight: '150px',textAlign: 'center'}} >
                <form onSubmit={e => {
                  e.preventDefault()
                  props.onValidateType(addExpenseTypeInput.value)
                }}>
                    <Form style={{height : '10px',marginLeft: '35%',marginBottom : '20px'}}>
                      <Col md={4}>
                        <FormControl  id="get-expenseType" type="text"
                          inputRef={ (ref) => addExpenseTypeInput = ref }
                         />
                      </Col>
                         <Col md={3} >
                             <Button style={{display : 'inline-block'}} bsStyle="primary" type="submit">
                               Validate
                             </Button>
                         </Col>
                    </Form>
                </form>

                  <Col  mdOffset={4} md={8} style = {{marginTop : '40px'}}>
                    <div style={{fontSize: '2em',textAlign: 'center',fontStyle : 'italic'}}>
                    {props.expenseTypes.items.map(expenseType =>

                      <tr style = {{textAlign : 'center'}} id = {expenseType._id} >

                      <td id = {'label_'+expenseType._id} style = {{textAlign: 'left'}}>  {expenseType.label} </td>

                        <td><Button onClick={e => {
                          e.preventDefault()
                          props.clickDeleteExpenseType(expenseType._id)
                        }} style={{marginLeft:'25px'}} bsStyle="danger"  >
                          <Glyphicon glyph="remove" />
                        </Button > </td>

                      </tr>

                    )}
                    </div>
                 </Col>


                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={e => {
                    e.preventDefault()
                    props.onValidateModal(false)
                  }}>{translate(props.lang, 'CLOSE')}</Button>
                </Modal.Footer>
              </Modal>

    </CenterPanel>

  )
}

ExpenseForm.propTypes = {
  expenseTypes : PropTypes.shape({
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
    displayModal : PropTypes.bool.isRequired,
    expenseForm : PropTypes.shape({
      amountValSate: PropTypes.string.isRequired
    })
  }),
  lang :PropTypes.string.isRequired
}

export default ExpenseForm
