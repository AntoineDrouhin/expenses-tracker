import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormGroup , ControlLabel, FormControl, Button, Alert } from 'react-bootstrap'
import CenterPanel from '../components/CenterPanel'
import { postUser } from '../actions/user_asyncActions'
import { browserHistory } from 'react-router'
import BG from '../img/expense_blur.png'
import logo from '../img/logo.png'
import LangSelector from '../containers/langSelector'
import translate from '../lang/language.js'

import { userCreationError } from '../actions/user_actions'

import ReCAPTCHA_EN from '../components/captcha_en'
import ReCAPTCHA_FR from '../components/captcha_fr'

const CreateUser = (props) => {

  if( props.user && props.user.connected ){
    browserHistory.push('/')
  }

  if( props.createUserOptions.creationSuccess ) {
    browserHistory.push('/login')
  }

  let emailInput = null, passwordInput = null, passwordConfirm = null, tokenCaptcha = null
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

  function renderCaptcha() {
    switch (props.lang) {
    case 'fr':
      return <ReCAPTCHA_FR
              sitekey={`${process.env.GCAPTCHA_PUBLIC_KEY}`}
              callback={(value)=> { tokenCaptcha = value}}
              />
    default :
      return <ReCAPTCHA_EN
              sitekey={`${process.env.GCAPTCHA_PUBLIC_KEY}`}
              callback={(value)=> {tokenCaptcha = value}}
              />
    }
  }
  return (
    <div style={style}>
    <div style={{position:'absolute', right:'15px', top:'15px' }}><LangSelector></LangSelector></div>
    <div style={{boxShadow: '10px 10px 111px 6px rgba(0,0,0,0.75)', maxWidth:'332px', margin: 'auto'}}>
    <CenterPanel maxWidth='332px'>
    <div style={{textAlign:'center', borderBottom:'1px solid #ccc', marginBottom:'10px'}}>
      <div style={{marginTop:'4px', fontSize:'18px'}}>
        <img style={{height:'60px',width:'60px'}} src={logo}/>
      </div>
      <h4>Expense Tracker</h4>
      </div>
      <form onSubmit={e => {
        e.preventDefault() // prevent page refresh after submit
        if (passwordInput.value != null && passwordConfirm.value == passwordInput.value) {
          props.onValidate(emailInput.value, passwordInput.value, props.lang, tokenCaptcha)
        } else {
          props.onError('Password is different from password confirmation')
        }
      }}>
      <FormGroup>
        <ControlLabel>{translate(props.lang, 'EMAIL_ADDRES')}</ControlLabel>
        <FormControl
          type='email'
          inputRef={ (ref) => emailInput = ref }
          placeholder={translate(props.lang, 'EMAIL_ADDRES_DISP')}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{translate(props.lang, 'PASSWORD')}</ControlLabel>
        <FormControl
          type='password'
          inputRef={ (ref) => passwordInput = ref }
          placeholder='*********'
        />
      </FormGroup >
      <FormGroup>
        <ControlLabel>{translate(props.lang, 'CONFIRM_PASSWORD')}</ControlLabel>
        <FormControl
          type='password'
          inputRef={ (ref) => passwordConfirm = ref }
          placeholder='*********'
        />
      </FormGroup >
      {renderCaptcha()}
      <br/>
      <div style={{'textAlign': 'right' }}>
        <Button type="submit" bsStyle="primary">
          {translate(props.lang, 'SIGN_UP')}
        </Button>
      </div>
      </form>
      {props.createUserOptions.error &&
        <Alert bsStyle="danger" >
          <h4>{translate(props.lang, 'CHECK_INFO')}</h4>
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
  }),
  lang : PropTypes.string.isRequire,
}

const mapDispatchToProps = (dispatch) => {
  return {
    onValidate: (email, password, lang, tokenCaptcha) => {
      dispatch(postUser(email, password, lang, tokenCaptcha))
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
