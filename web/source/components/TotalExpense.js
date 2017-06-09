import React, { PropTypes } from 'react'
import { Col, Label } from 'react-bootstrap'
import translate from '../lang/language.js'

const TotalExpense = (props) => {

  return (
    <div>
      <Col md={3} mdOffset={6}><h3>{translate(props.lang, 'TOTAL_EXPENSE')} :</h3></Col>
      <Col md={3}><h2><Label bsStyle="info">{props.totalAmount}</Label ></h2></Col>
    </div>
  )
}

TotalExpense.propTypes = {
  totalAmount : PropTypes.number.isRequired,
  lang : PropTypes.string.isRequired
}

export default TotalExpense
