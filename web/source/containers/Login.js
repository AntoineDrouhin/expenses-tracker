import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {Alert, FormGroup , ControlLabel, FormControl, Button, Row, Col } from 'react-bootstrap'
import CenterPanel from '../components/CenterPanel'
import { login } from '../actions/user_asyncActions'
import { browserHistory } from 'react-router'

const Login = (props) => {

  if( props.user && props.user.connected ){
    browserHistory.push('/')
  }

  let emailInput = null, passwordInput = null

  return (
    <CenterPanel maxWidth='300px' marginTop='30px'>
      <form onSubmit={e => {
        e.preventDefault() // prevent page refresh after submit
        props.onValidate(emailInput.value, passwordInput.value )
      }}>
      <FormGroup>
        <ControlLabel>Email address</ControlLabel>
        <FormControl
          type='email'
          inputRef={ (ref) => emailInput = ref }
          placeholder='my_address@domain.com'
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Password</ControlLabel>
        <FormControl
          type='password'
          inputRef={ (ref) => passwordInput = ref }
          placeholder='easyAs123'
        />
      </FormGroup >
      <Row>
        <Col md={6}>
          <Button onClick={() => browserHistory.push('/signUp')}>
            Sign Up
          </Button>
        </Col>

        <Col md={6}>
          <Button type="submit" bsStyle="primary">
            Sign In
          </Button>
        </Col>

      </Row>
      </form>
      <br/>
      {props.user.error &&
        <Alert bsStyle="danger" >
          <h4>Oh sorry!</h4>
          <p>Plese check your connection information</p>
        </Alert>
      }
    </CenterPanel>

  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onValidate: (email, password) => {
      dispatch(login(email, password))
    }
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
