import React from 'react'
import { connect } from 'react-redux'
import {Alert, FormGroup , ControlLabel, FormControl, Button, Row, Col } from 'react-bootstrap'
import CenterPanel from '../components/CenterPanel'
import { login } from '../actions/user_asyncActions'
import { browserHistory } from 'react-router'
import BG from '../img/expense_blur.png'
import logo from '../img/logo.png'

const Login = (props) => {



  if( props.user && props.user.connected ){
    browserHistory.push('/')
  }

  let emailInput = null, passwordInput = null

  var w = window,
    d = document,
    documentElement = d.documentElement,
    body = d.getElementsByTagName('body')[0]

  let style = {
    background: 'url('+BG+')',
    backgroundSize: 'cover',
    padding: '15%',
    height: w.innerHeight|| documentElement.clientHeight|| body.clientHeight
  }

  return (
    <div style={style}>
    <div style={{boxShadow: '10px 10px 111px 6px rgba(0,0,0,0.75)', maxWidth:'300px', margin: 'auto'}}>
    <CenterPanel  maxWidth='300px' >
    <div style={{textAlign:'center', borderBottom:'1px solid #ccc', marginBottom:'10px'}}>
      <div style={{marginTop:'4px', fontSize:'18px'}}>
        <img style={{height:'60px',width:'60px'}} src={logo}/>
      </div>
      <h4>Expense Tracker</h4>
      </div>
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
        <div style={{'textAlign': 'right' }}>
          <Button type="submit" bsStyle="primary">
            Sign In
          </Button>
          </div>
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
    </div>
    </div>
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
