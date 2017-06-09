import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormGroup , ControlLabel, FormControl, Button, Alert } from 'react-bootstrap'
import CenterPanel from '../components/CenterPanel'
import { postUser } from '../actions/user_asyncActions'
import { browserHistory } from 'react-router'
import BG from '../img/expense_blur.png'
import logo from '../img/logo.png'

import { userCreationError } from '../actions/user_actions'

const CreateUser = (props) => {

  if( props.user && props.user.connected ){
    browserHistory.push('/')
  }

  if( props.createUserOptions.creationSuccess ) {
    browserHistory.push('/login')
  }

  let emailInput = null, passwordInput = null, passwordConfirm = null
  var w = window,
    d = document,
    documentElement = d.documentElement,
    body = d.getElementsByTagName('body')[0]

  let style = {
    background: 'url('+BG+')',
    backgroundSize: 'cover',
    padding: '10%',
    height: w.innerHeight|| documentElement.clientHeight|| body.clientHeight
  }
  return (
    <div style={style}>
    <div style={{boxShadow: '10px 10px 111px 6px rgba(0,0,0,0.75)', maxWidth:'300px', margin: 'auto'}}>
    <CenterPanel maxWidth='300px'>
    <div style={{textAlign:'center', borderBottom:'1px solid #ccc', marginBottom:'10px'}}>
      <div style={{marginTop:'4px', fontSize:'18px'}}>
        <img style={{height:'60px',width:'60px'}} src={logo}/>
      </div>
      <h4>Expense Tracker</h4>
      </div>
      <form onSubmit={e => {
        e.preventDefault() // prevent page refresh after submit
        if (passwordInput.value != null && passwordConfirm.value == passwordInput.value) {
          props.onValidate(emailInput.value, passwordInput.value)
        } else {
          props.onError('Password is different from password confirmation')
        }
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
        <ControlLabel>Confirm Password</ControlLabel>
        <FormControl
          type='password'
          inputRef={ (ref) => passwordConfirm = ref }
          placeholder='easyAs123'
        />
      </FormGroup >
      <div style={{'textAlign': 'right' }}>
        <Button type="submit" bsStyle="primary">
          Submit
        </Button>
      </div>
      </form>
      {props.createUserOptions.error &&
        <Alert bsStyle="danger" >
          <h4>{'Error'}</h4>
          <p>{props.createUserOptions.errorMsg}</p>
        </Alert>
      }
    </CenterPanel>
    </div>
    </div>
  )
}

CreateUser.propTypes = {
  'onValidate': PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    connected: PropTypes.bool.isRequired
  }),
  createUserOptions: PropTypes.shape({
    error : PropTypes.bool.isRequired,
    errorMsg : PropTypes.string.isRequire,
    creationSuccess : PropTypes.bool.isRequired
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    onValidate: (email, password) => {
      dispatch(postUser(email, password))
    },
    onError: (errorMsg) => {
      dispatch(userCreationError(errorMsg))
    }
  }
}

const mapStateToProps = (state) => {
  return { user: state.user, lang : state.lang, createUserOptions : state.displayOption.createUser }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)
