import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormGroup , ControlLabel, FormControl, Button } from 'react-bootstrap'
import CenterPanel from '../components/CenterPanel'
import { postUser } from '../actions/user_asyncActions'
import { browserHistory } from 'react-router'
import BG from '../img/expense_blur.png'

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
    <CenterPanel maxWidth='300px'>
      <form onSubmit={e => {
        e.preventDefault() // prevent page refresh after submit
        props.onValidate(emailInput.value, passwordInput.value)
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
      <FormGroup>
        <ControlLabel>Password</ControlLabel>
        <FormControl
          type='password'
          inputRef={ (ref) => passwordInput = ref }
          placeholder='easyAs123'
        />
      </FormGroup >
      <div style={{'textAlign': 'right' }}>
        <Button type="submit" bsStyle="primary">
          Submit
        </Button>
      </div>
      </form>
    </CenterPanel>
    </div>
    </div>
  )
}

Login.propTypes = {
  'onValidate': PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    connected: PropTypes.bool.isRequired
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    onValidate: (email, password) => {
      dispatch(postUser(email, password))
      // TODO .then(e => (req, res) browserHistory.push('/login'))
    }
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
